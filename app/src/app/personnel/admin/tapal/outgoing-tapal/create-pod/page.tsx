"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const labelCls = "mb-1 block text-xs font-medium text-dark dark:text-white";
const inputCls = "w-full rounded border border-stroke bg-transparent px-3 py-1.5 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:text-white";

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3 mt-5">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

interface NoteItem { author: string; initials: string; date: string; content: string }

export default function CreatePODPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    sendingDate: "",
    tapalRefNumber: "",
    serviceName: "",
    podNo: "",
    podDate: "",
    podAmount: "",
  });

  // Note modal
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent]     = useState("");
  const [notes, setNotes]                 = useState<NoteItem[]>([]);
  const [activeNote, setActiveNote]       = useState(0);
  const [showViewNote, setShowViewNote]   = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const execCmd = (cmd: string, val?: string) => { document.execCommand(cmd, false, val); };

  const saveNote = () => {
    if (!noteContent.trim()) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    setNotes(n => [...n, { author: "Current User", initials: "CU", date: dateStr, content: noteContent }]);
    setNoteContent("");
    setShowNoteModal(false);
  };

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">POD Outgoing Tapal</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Tapal</li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/personnel/admin/tapal/outgoing-tapal/list" className="font-medium text-dark hover:text-primary dark:text-gray-400">
                Outgoing Tapal
              </Link>
            </li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">POD Outgoing Tapal</li>
          </ol>
        </nav>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="rounded-t-[10px] px-5 py-2.5" style={{ background: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">
            POD Outgoing Tapal <span className="font-normal opacity-80">(- Mandatory Fields)</span>
          </h3>
        </div>

        <div className="p-5">
          {/* ── POD Details ── */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Sending Date */}
            <div>
              <label className={labelCls}>Sending Date <span className="text-red-500">*</span></label>
              <input type="date" value={form.sendingDate} onChange={set("sendingDate")} className={inputCls} />
            </div>

            {/* Tapal Reference Number */}
            <div>
              <label className={labelCls}>Tapal Reference Number <span className="text-red-500">*</span></label>
              <input type="text" value={form.tapalRefNumber} onChange={set("tapalRefNumber")}
                placeholder="Enter tapal reference number" className={inputCls} />
            </div>

            {/* Service Name */}
            <div>
              <label className={labelCls}>Service Name <span className="text-red-500">*</span></label>
              <input type="text" value={form.serviceName} onChange={set("serviceName")}
                placeholder="Enter service name" className={inputCls} />
            </div>

            {/* POD No */}
            <div>
              <label className={labelCls}>POD No <span className="text-red-500">*</span></label>
              <input type="text" value={form.podNo} onChange={set("podNo")}
                placeholder="Enter POD number" className={inputCls} />
            </div>

            {/* POD Date */}
            <div>
              <label className={labelCls}>POD Date <span className="text-red-500">*</span></label>
              <input type="date" value={form.podDate} onChange={set("podDate")} className={inputCls} />
            </div>

            {/* POD Amount */}
            <div>
              <label className={labelCls}>POD Amount <span className="text-red-500">*</span></label>
              <input type="number" value={form.podAmount} onChange={set("podAmount")}
                placeholder="0.00" min="0" step="0.01" className={inputCls} />
            </div>
          </div>

          {/* ── Workflow ── */}
          <SubHeader title="Workflow" />
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            <div>
              <label className={labelCls}>Skip Approval</label>
              <select className={inputCls.replace("bg-transparent", "bg-white dark:bg-gray-dark")}>
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Forward To</label>
              <select className={inputCls.replace("bg-transparent", "bg-white dark:bg-gray-dark")}>
                <option value="">Select Employee</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Forward For</label>
              <select className={inputCls.replace("bg-transparent", "bg-white dark:bg-gray-dark")}>
                <option value="">Select Action</option>
                <option>Approval</option>
                <option>Review</option>
              </select>
            </div>
          </div>

          {/* Create Note button */}
          <div className="mt-4">
            <button onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              Create Note
            </button>
            {notes.length > 0 && (
              <button onClick={() => { setActiveNote(0); setShowViewNote(true); }}
                className="ml-2 flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
                View Note ({notes.length})
              </button>
            )}
          </div>

          {/* ── Bottom actions ── */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/admin/tapal/outgoing-tapal/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Submit
            </button>
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
              {/* Toolbar */}
              <div className="mb-2 flex flex-wrap gap-1 rounded border border-stroke p-1.5 dark:border-dark-3">
                {[["B","bold"],["I","italic"],["U","underline"],["S","strikeThrough"]].map(([lbl, cmd]) => (
                  <button key={cmd} onMouseDown={e => { e.preventDefault(); execCmd(cmd); }}
                    className="rounded px-2 py-0.5 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
                    style={lbl === "B" ? { fontWeight: 700 } : lbl === "I" ? { fontStyle: "italic" } : lbl === "U" ? { textDecoration: "underline" } : { textDecoration: "line-through" }}>
                    {lbl}
                  </button>
                ))}
                <div className="mx-1 w-px bg-stroke dark:bg-dark-3" />
                <button onMouseDown={e => { e.preventDefault(); execCmd("insertOrderedList"); }}
                  className="rounded px-2 py-0.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700">OL</button>
                <button onMouseDown={e => { e.preventDefault(); execCmd("insertUnorderedList"); }}
                  className="rounded px-2 py-0.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700">UL</button>
              </div>
              <div contentEditable suppressContentEditableWarning
                onInput={e => setNoteContent((e.target as HTMLDivElement).innerHTML)}
                className="min-h-[100px] rounded border border-stroke p-3 text-sm text-dark outline-none dark:border-dark-3 dark:text-white"
                data-placeholder="Write your note here..." />

              {/* Created By */}
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

      {/* ── View Note Modal ── */}
      {showViewNote && notes.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xl mx-4 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] px-5 py-3" style={{ background: "#17a2b8" }}>
              <h4 className="text-sm font-semibold text-white">View Note</h4>
              <button onClick={() => setShowViewNote(false)} className="text-white hover:opacity-70 text-xl leading-none">×</button>
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-400 mb-1">{notes[activeNote].date}</p>
              <div className="text-sm leading-relaxed text-dark dark:text-white"
                dangerouslySetInnerHTML={{ __html: notes[activeNote].content }} />
              <div className="mt-4 rounded border-2 border-[#fd7e14] bg-orange-50 p-3 dark:bg-gray-800">
                <p className="mb-1 text-xs font-semibold text-[#fd7e14]">Created By</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fd7e14] text-xs font-bold text-white">
                    {notes[activeNote].initials}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-dark dark:text-white">{notes[activeNote].author}</p>
                    <p className="text-xs text-gray-400">{notes[activeNote].date}</p>
                  </div>
                </div>
              </div>
              {notes.length > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  {notes.map((_, i) => (
                    <button key={i} onClick={() => setActiveNote(i)}
                      className="h-2.5 w-2.5 rounded-full transition-colors"
                      style={{ background: i === activeNote ? "#17a2b8" : "#d1d5db" }} />
                  ))}
                </div>
              )}
              <div className="mt-4 flex justify-end border-t border-stroke pt-3 dark:border-dark-3">
                <button onClick={() => setShowViewNote(false)}
                  className="rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
