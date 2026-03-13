"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── Style constants ── */
const labelCls  = "mb-1 block text-xs font-medium text-dark dark:text-white";
const inputCls  = "flex-1 min-w-0 px-3 py-1.5 text-sm text-dark bg-transparent outline-none dark:text-white";
const selectCls = "flex-1 min-w-0 px-3 py-1.5 text-sm text-dark bg-white outline-none dark:bg-gray-dark dark:text-white";

/* ── Icon-prefix field wrapper ── */
const IBox = ({ label, required = false, icon, children }: {
  label: string; required?: boolean; icon: React.ReactNode; children: React.ReactNode;
}) => (
  <div>
    <label className={labelCls}>{label}{required && <span className="ml-0.5 text-red-500">*</span>}</label>
    <div className="flex items-stretch rounded border border-stroke overflow-hidden dark:border-dark-3">
      <span className="flex min-w-[34px] items-center justify-center bg-gray-100 border-r border-stroke text-gray-500 dark:bg-gray-700 dark:border-dark-3">
        {icon}
      </span>
      {children}
    </div>
  </div>
);

/* ── Icons ── */
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
  </svg>
);
const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.16"/>
  </svg>
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

/* ── Sample data generated on click ── */
const GENERATED_ROWS = [
  { pf: "PF001234", name: "SADIQUE ALI S",   date: "01-Mar-2026", inTime: "09:00", outTime: "18:00", workDur: "09:00", ot: "00:00", total: "09:00", attType: "Present", shiftType: "General" },
  { pf: "PF001235", name: "VIJAYAKUMAR V.R", date: "01-Mar-2026", inTime: "09:05", outTime: "18:10", workDur: "09:05", ot: "00:10", total: "09:15", attType: "Present", shiftType: "General" },
  { pf: "PF001236", name: "RAVI A P",        date: "01-Mar-2026", inTime: "09:00", outTime: "18:00", workDur: "09:00", ot: "00:00", total: "09:00", attType: "Present", shiftType: "General" },
  { pf: "PF001237", name: "VAIRAMUTHU R",    date: "01-Mar-2026", inTime: "08:55", outTime: "18:05", workDur: "09:10", ot: "00:05", total: "09:15", attType: "Present", shiftType: "General" },
  { pf: "PF001238", name: "MANGALAM K",      date: "01-Mar-2026", inTime: "",      outTime: "",      workDur: "",      ot: "",      total: "",      attType: "Absent",  shiftType: "General" },
  { pf: "PF001239", name: "ANITHA G",        date: "01-Mar-2026", inTime: "09:00", outTime: "18:00", workDur: "09:00", ot: "00:00", total: "09:00", attType: "Present", shiftType: "General" },
];
type StmtRow = typeof GENERATED_ROWS[number] & { selected: boolean };

interface NoteItem { author: string; initials: string; date: string; content: string }

export default function CreateManualAttendancePage() {
  const router = useRouter();

  const [horo,           setHoro]           = useState("HO");
  const [entityTypeCode, setEntityTypeCode] = useState("");
  const [entityTypeName, setEntityTypeName] = useState("");
  const [entityCode,     setEntityCode]     = useState("");
  const [entityName,     setEntityName]     = useState("");
  const [deptCode,       setDeptCode]       = useState("");
  const [deptName,       setDeptName]       = useState("");
  const [empName,        setEmpName]        = useState("");
  const [pfNumber,       setPfNumber]       = useState("");
  const [attDate,        setAttDate]        = useState("");
  const [forwardTo,      setForwardTo]      = useState("");
  const [forwardFor,     setForwardFor]     = useState("");

  const [stmtRows,  setStmtRows]  = useState<StmtRow[]>([]);
  const [generated, setGenerated] = useState(false);

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent,  setNoteContent]   = useState("");
  const [notes,        setNotes]         = useState<NoteItem[]>([]);

  const handleGenerate = () => {
    setStmtRows(GENERATED_ROWS.map(r => ({ ...r, selected: false })));
    setGenerated(true);
  };

  const toggleSelect = (i: number) =>
    setStmtRows(rows => rows.map((r, idx) => idx === i ? { ...r, selected: !r.selected } : r));

  const execCmd = (cmd: string) => { document.execCommand(cmd, false, undefined); };

  const saveNote = () => {
    if (!noteContent.trim()) return;
    const dateStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    setNotes(n => [...n, { author: "Current User", initials: "CU", date: dateStr, content: noteContent }]);
    setNoteContent("");
    setShowNoteModal(false);
  };

  const thCls = "border-r border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold text-white last:border-r-0 whitespace-nowrap";

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Manual Attendance</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Attendance</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Manual Attendance</li>
          </ol>
        </nav>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] px-5 py-2.5" style={{ background: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">Manual Attendance</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Row 1: HO/RO + Entity Type Code + Entity Type Name */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <IBox label="HO / RO" required icon={<HomeIcon />}>
              <select value={horo} onChange={e => setHoro(e.target.value)} className={selectCls}>
                <option value="HO">HO</option>
                <option value="RO">RO</option>
              </select>
            </IBox>
            <IBox label="Entity Type Code" required icon={<BuildingIcon />}>
              <input value={entityTypeCode} onChange={e => setEntityTypeCode(e.target.value)}
                placeholder="Enter code" className={inputCls} />
            </IBox>
            <IBox label="Entity Type Name" required icon={<BuildingIcon />}>
              <input value={entityTypeName} onChange={e => setEntityTypeName(e.target.value)}
                placeholder="Enter name" className={inputCls} />
            </IBox>
          </div>

          {/* Row 2: Entity Code + Entity Name + Department Code */}
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <IBox label="Entity Code" required icon={<BuildingIcon />}>
              <input value={entityCode} onChange={e => setEntityCode(e.target.value)}
                placeholder="Enter code" className={inputCls} />
            </IBox>
            <IBox label="Entity Name" required icon={<BuildingIcon />}>
              <input value={entityName} onChange={e => setEntityName(e.target.value)}
                placeholder="Enter name" className={inputCls} />
            </IBox>
            <IBox label="Department Code" required icon={<BuildingIcon />}>
              <input value={deptCode} onChange={e => setDeptCode(e.target.value)}
                placeholder="Enter code" className={inputCls} />
            </IBox>
          </div>

          {/* Row 3: Department Name + Employee Name + PF Number */}
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <IBox label="Department Name" required icon={<BuildingIcon />}>
              <input value={deptName} onChange={e => setDeptName(e.target.value)}
                placeholder="Enter name" className={inputCls} />
            </IBox>
            <IBox label="Employee Name" icon={<UserIcon />}>
              <input value={empName} onChange={e => setEmpName(e.target.value)}
                placeholder="Enter name" className={inputCls} />
            </IBox>
            <IBox label="PF Number" icon={<FileIcon />}>
              <input value={pfNumber} onChange={e => setPfNumber(e.target.value)}
                placeholder="Enter PF number" className={inputCls} />
            </IBox>
          </div>

          {/* Row 4: Date + Generate */}
          <div className="mt-4 flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px] max-w-xs">
              <IBox label="Date" required icon={<CalendarIcon />}>
                <input type="date" value={attDate} onChange={e => setAttDate(e.target.value)} className={inputCls} />
              </IBox>
            </div>
            <button type="button" onClick={handleGenerate}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Generate
            </button>
          </div>

          {/* ── Manual Attendance Statement ── */}
          <SubHeader title="Manual Attendance Statement" />
          <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
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
                  <th className={thCls + " w-14 text-center"}>Select</th>
                </tr>
              </thead>
              <tbody>
                {!generated || stmtRows.length === 0 ? (
                  <tr className="bg-white dark:bg-gray-dark">
                    <td colSpan={11} className="px-4 py-6 text-center text-xs text-gray-400">No records found. Fill the form and click Generate.</td>
                  </tr>
                ) : stmtRows.map((row, idx) => (
                  <tr key={idx} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}`}>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.pf}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.name}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.date}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.inTime || "—"}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.outTime || "—"}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.workDur || "—"}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.ot || "—"}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.total || "—"}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.attType}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.shiftType}</td>
                    <td className="px-3 py-2 text-center">
                      <input type="checkbox" checked={row.selected} onChange={() => toggleSelect(idx)}
                        className="accent-[#2d8f7b]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Forward To / Forward For */}
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <IBox label="Forward To" required icon={<ArrowIcon />}>
              <input type="text" value={forwardTo} onChange={e => setForwardTo(e.target.value)}
                placeholder="Select employee" className={inputCls} />
            </IBox>
            <IBox label="Forward For" required icon={<ArrowIcon />}>
              <select value={forwardFor} onChange={e => setForwardFor(e.target.value)} className={selectCls}>
                <option value="">Select</option>
                <option>Final Approval</option>
                <option>Review</option>
                <option>Information</option>
              </select>
            </IBox>
          </div>

          {/* Create Note + actions */}
          <div className="mt-5 flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Create Note
              {notes.length > 0 && <span className="ml-1 rounded-full bg-white/30 px-1.5 text-[10px]">{notes.length}</span>}
            </button>
            <div className="flex gap-3">
              <button onClick={() => router.push("/personnel/human-resource/attendance/manual-attendance/list")}
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

      {/* ── Create Note Modal ── */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xl mx-4 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] px-5 py-3" style={{ background: "#2d8f7b" }}>
              <h4 className="text-sm font-semibold text-white">Create Note</h4>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-70 text-xl leading-none">×</button>
            </div>
            <div className="p-5">
              <div className="mb-2 flex flex-wrap gap-1 rounded border border-stroke p-1.5 dark:border-dark-3">
                {[["B","bold"],["I","italic"],["U","underline"],["S","strikeThrough"]].map(([lbl, cmd]) => (
                  <button key={cmd} onMouseDown={e => { e.preventDefault(); execCmd(cmd); }}
                    className="rounded px-2 py-0.5 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-700">
                    {lbl}
                  </button>
                ))}
                <div className="mx-1 w-px bg-stroke dark:bg-dark-3" />
                <button onMouseDown={e => { e.preventDefault(); document.execCommand("insertOrderedList", false, undefined); }}
                  className="rounded px-2 py-0.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700">OL</button>
                <button onMouseDown={e => { e.preventDefault(); document.execCommand("insertUnorderedList", false, undefined); }}
                  className="rounded px-2 py-0.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700">UL</button>
              </div>
              <div contentEditable suppressContentEditableWarning
                onInput={e => setNoteContent((e.target as HTMLDivElement).innerHTML)}
                className="min-h-[100px] rounded border border-stroke p-3 text-sm text-dark outline-none dark:border-dark-3 dark:text-white" />
              <div className="mt-4 rounded border-2 border-[#fd7e14] bg-orange-50 p-3 dark:bg-gray-800">
                <p className="mb-1 text-xs font-semibold text-[#fd7e14]">Created By</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fd7e14] text-xs font-bold text-white">CU</div>
                  <div>
                    <p className="text-xs font-medium text-dark dark:text-white">Current User</p>
                    <p className="text-xs text-gray-400">{new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2 border-t border-stroke pt-3 dark:border-dark-3">
                <button onClick={() => setShowNoteModal(false)}
                  className="rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Cancel</button>
                <button onClick={saveNote}
                  className="rounded bg-[#2d8f7b] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Save Note</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
