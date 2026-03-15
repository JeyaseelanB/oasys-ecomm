"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── Style constants ── */
const labelCls = "mb-1 block text-xs font-medium text-dark dark:text-white";

/* Icon-prefix field wrapper */
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

const inputCls  = "flex-1 min-w-0 px-3 py-1.5 text-sm text-dark bg-transparent outline-none dark:text-white";
const selectCls = "flex-1 min-w-0 px-3 py-1.5 text-sm text-dark bg-white outline-none dark:bg-gray-dark dark:text-white";

/* Icons */
const ListIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const HashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
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
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.16"/>
  </svg>
);

/* Time spinner component */
const TimeSpinner = ({ value, onChange, label, required = false }: {
  value: string; onChange: (v: string) => void; label: string; required?: boolean;
}) => {
  const adjust = (delta: number) => {
    const [h, m] = (value || "00:00").split(":").map(Number);
    const total = (h * 60 + m + delta + 1440) % 1440;
    const nh = String(Math.floor(total / 60)).padStart(2, "0");
    const nm = String(total % 60).padStart(2, "0");
    onChange(`${nh}:${nm}`);
  };
  return (
    <div>
      <label className={labelCls}>{label}{required && <span className="ml-0.5 text-red-500">*</span>}</label>
      <div className="flex items-stretch rounded border border-stroke overflow-hidden dark:border-dark-3">
        <span className="flex min-w-[34px] items-center justify-center bg-gray-100 border-r border-stroke text-gray-500 dark:bg-gray-700 dark:border-dark-3">
          <ClockIcon />
        </span>
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          placeholder="HH:MM" className={inputCls} />
        <div className="flex flex-col border-l border-stroke dark:border-dark-3">
          <button type="button" onClick={() => adjust(1)}
            className="flex h-1/2 items-center justify-center px-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 text-[10px]">▲</button>
          <button type="button" onClick={() => adjust(-1)}
            className="flex h-1/2 items-center justify-center px-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-stroke dark:border-dark-3 text-[10px]">▼</button>
        </div>
      </div>
    </div>
  );
};

/* SubHeader */
const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3 mt-5">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

interface ExternalRow { id: number; name: string; org: string; mobile: string; email: string; saved: boolean }

interface NoteItem { author: string; initials: string; date: string; content: string }

export default function CreateMeetingRequestPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    type: "", venue: "", agenda: "", meetingDate: "",
    startTime: "", endTime: "", totalAttendees: "0",
    additionalRequirements: "", agendaPoints: "",
    forwardTo: "", forwardFor: "",
  });

  const [externalRows, setExternalRows] = useState<ExternalRow[]>([
    { id: 1, name: "", org: "", mobile: "", email: "", saved: false },
  ]);
  const [nextExtId, setNextExtId] = useState(2);

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent,  setNoteContent]   = useState("");
  const [notes,        setNotes]         = useState<NoteItem[]>([]);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const addExtRow = () => {
    setExternalRows(r => [...r, { id: nextExtId, name: "", org: "", mobile: "", email: "", saved: false }]);
    setNextExtId(n => n + 1);
  };
  const removeExtRow = (id: number) => setExternalRows(r => r.filter(x => x.id !== id));
  const updateExtRow = (id: number, k: keyof ExternalRow, v: string) =>
    setExternalRows(r => r.map(x => x.id === id ? { ...x, [k]: v } : x));
  const saveExtRow = (id: number) =>
    setExternalRows(r => r.map(x => x.id === id ? { ...x, saved: true } : x));

  const execCmd = (cmd: string) => { document.execCommand(cmd, false, undefined); };

  const saveNote = () => {
    if (!noteContent.trim()) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    setNotes(n => [...n, { author: "Current User", initials: "CU", date: dateStr, content: noteContent }]);
    setNoteContent("");
    setShowNoteModal(false);
  };

  const thCls = "border-r border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold text-white last:border-r-0";

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Meeting Request</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Meeting</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Meeting Request</li>
          </ol>
        </nav>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] px-5 py-2.5" style={{ background: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">Department Meeting Request</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Row 1: Type / Venue / Agenda / Meeting Date */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <IBox label="Type" required icon={<ListIcon />}>
              <select value={form.type} onChange={set("type")} className={selectCls}>
                <option value="">Select</option>
                <option>Internal</option>
                <option>External</option>
                <option>Internal & External</option>
              </select>
            </IBox>
            <IBox label="Venue" required icon={<PinIcon />}>
              <select value={form.venue} onChange={set("venue")} className={selectCls}>
                <option value="">Select</option>
                <option>Chennai</option>
                <option>Madurai</option>
                <option>Coimbatore</option>
                <option>Erode</option>
              </select>
            </IBox>
            <IBox label="Agenda of the Meeting" required icon={<ListIcon />}>
              <input type="text" value={form.agenda} onChange={set("agenda")}
                placeholder="Enter agenda" className={inputCls} />
            </IBox>
            <IBox label="Meeting Date" required icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            }>
              <input type="date" value={form.meetingDate} onChange={set("meetingDate")} className={inputCls} />
            </IBox>
          </div>

          {/* Row 2: Start Time / End Time / Total Attendees */}
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            <TimeSpinner label="Meeting Start Time" required value={form.startTime}
              onChange={v => setForm(f => ({ ...f, startTime: v }))} />
            <TimeSpinner label="Meeting End Time" value={form.endTime}
              onChange={v => setForm(f => ({ ...f, endTime: v }))} />
            <IBox label="Total Attendees" icon={<HashIcon />}>
              <input type="number" value={form.totalAttendees} readOnly className={inputCls + " bg-gray-50 dark:bg-gray-700 cursor-not-allowed"} />
            </IBox>
          </div>

          {/* Additional Requirements */}
          <div className="mt-4">
            <label className={labelCls}>Additional Requirements</label>
            <textarea value={form.additionalRequirements} onChange={set("additionalRequirements")} rows={3}
              placeholder="Enter text ..."
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white resize-none" />
          </div>

          {/* ── Internal ── */}
          <SubHeader title="Internal" />
          <div className="flex justify-end mb-2">
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <RefreshIcon />
              Load Employees
            </button>
          </div>
          <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  <th className={thCls + " w-10"}>#</th>
                  <th className={thCls}>Name</th>
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
          <div className="mt-1 flex justify-end text-xs text-gray-500">(1 of 1) &nbsp;
            <button className="rounded border border-stroke px-1.5 py-0.5 text-xs disabled:opacity-40">«</button>&nbsp;
            <button className="rounded border border-stroke px-1.5 py-0.5 text-xs disabled:opacity-40">‹</button>&nbsp;
            <button className="rounded border border-stroke px-1.5 py-0.5 text-xs disabled:opacity-40">›</button>&nbsp;
            <button className="rounded border border-stroke px-1.5 py-0.5 text-xs disabled:opacity-40">»</button>&nbsp;
            <select className="rounded border border-stroke px-1 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white">
              <option>5</option><option>10</option>
            </select>
          </div>

          {/* ── External ── */}
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
                {externalRows.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                    <td className="px-3 py-2 text-center text-xs text-gray-500">{idx + 1}</td>
                    <td className="px-2 py-1.5">
                      <input value={row.name} onChange={e => updateExtRow(row.id, "name", e.target.value)}
                        className="w-full rounded border border-stroke px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-transparent dark:text-white" />
                    </td>
                    <td className="px-2 py-1.5">
                      <input value={row.org} onChange={e => updateExtRow(row.id, "org", e.target.value)}
                        className="w-full rounded border border-stroke px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-transparent dark:text-white" />
                    </td>
                    <td className="px-2 py-1.5">
                      <input value={row.mobile} onChange={e => updateExtRow(row.id, "mobile", e.target.value)}
                        className="w-full rounded border border-stroke px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-transparent dark:text-white" />
                    </td>
                    <td className="px-2 py-1.5">
                      <input value={row.email} onChange={e => updateExtRow(row.id, "email", e.target.value)}
                        className="w-full rounded border border-stroke px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-transparent dark:text-white" />
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => saveExtRow(row.id)}
                          className="flex h-6 w-6 items-center justify-center rounded bg-[#28a745] text-white hover:opacity-90" title="Save">
                          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                        <button onClick={() => removeExtRow(row.id)}
                          className="flex h-6 w-6 items-center justify-center rounded bg-[#dc3545] text-white hover:opacity-90" title="Delete">
                          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={addExtRow}
            className="mt-2 text-xs text-[#17a2b8] hover:underline">+ Add Row</button>

          {/* Agenda Points */}
          <div className="mt-4">
            <label className={labelCls}>Agenda Points</label>
            <textarea value={form.agendaPoints} onChange={set("agendaPoints")} rows={3}
              placeholder="Enter text ..."
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white resize-none" />
          </div>

          {/* Forward To / Forward For */}
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <IBox label="Forward to" required icon={<ArrowIcon />}>
              <input type="text" value={form.forwardTo} onChange={set("forwardTo")}
                placeholder="Select employee" className={inputCls} />
            </IBox>
            <IBox label="Forward for" required icon={<ArrowIcon />}>
              <select value={form.forwardFor}
                onChange={e => setForm(f => ({ ...f, forwardFor: e.target.value }))}
                className={selectCls}>
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
              <button onClick={() => router.push("/personnel/admin/meeting/meeting-request/list")}
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
