"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

const VF = ({ label, value, plain = false }: { label: string; value: string; plain?: boolean }) => (
  <div className="border-b border-stroke py-2 last:border-0 dark:border-dark-3">
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className={`mt-0.5 text-sm font-medium ${plain ? "text-dark dark:text-white" : "text-[#17a2b8]"}`}>
      {value || "-"}
    </p>
  </div>
);

interface NoteItem { title: string; content: string; date: string; author: string; initials: string }

const TAPAL = {
  sendingDate: "06-Apr-2023", deliveryType: "Speed Post", referenceNumber: "OGT9572",
  tapalRefNumber: "EXPORT", noOfLetters: "1", referenceDate: "06-Apr-2023",
  department: "MARKETING", section: "Export", subject: "SMALL PARCEL EXPORT",
  tapalFor: "Individual", name: "THIRU.PREMKUMAR", address1: "ERODE", address2: "",
  state: "-", district: "-", pincode: "-", paymentDetails: "-", incomingTapalRef: "",
};

const NOTES: NoteItem[] = [
  { title: "Dispatch Confirmation", content: "Outgoing tapal dispatched via Speed Post. Tracking number noted for follow-up.", date: "06 Apr 2023", author: "Dispatch Officer", initials: "DO" },
  { title: "Delivery Note", content: "Delivery confirmed by recipient. Proof of delivery collected.", date: "10 Apr 2023", author: "Admin Officer", initials: "AO" },
];

export default function ViewOutgoingTapalPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [activeNote,    setActiveNote]    = useState(0);

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Outgoing Tapal</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Tapal</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Outgoing Tapal</li>
          </ol>
        </nav>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="rounded-t-[10px] px-5 py-2.5" style={{ background: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">Outgoing Tapal</h3>
        </div>

        <div className="p-5">
          {/* ── Tapal Details ── */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <VF label="Sending Date"          value={TAPAL.sendingDate} />
            <VF label="Delivery Type"         value={TAPAL.deliveryType} />
            <VF label="Reference Number"      value={TAPAL.referenceNumber} />
            <VF label="Tapal Reference Number"value={TAPAL.tapalRefNumber} />
            <VF label="No of Letters"         value={TAPAL.noOfLetters} />
            <VF label="Reference Date"        value={TAPAL.referenceDate} />
            <VF label="Department"            value={TAPAL.department} />
            <VF label="Section"               value={TAPAL.section} />
          </div>
          <div className="mt-1">
            <VF label="Subject" value={TAPAL.subject} />
          </div>

          {/* ── Receiver Details ── */}
          <SubHeader title="Receiver Details" />
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <VF label="Tapal For"                   value={TAPAL.tapalFor} />
            <VF label="Name"                        value={TAPAL.name} />
            <VF label="Address Line 1"              value={TAPAL.address1} />
            <VF label="Address Line 2"              value={TAPAL.address2} plain />
            <VF label="State"                       value={TAPAL.state} plain />
            <VF label="District"                    value={TAPAL.district} plain />
            <VF label="Pincode"                     value={TAPAL.pincode} plain />
            <VF label="Payment Details"             value={TAPAL.paymentDetails} plain />
            <VF label="Incoming Tapal Reference No."value={TAPAL.incomingTapalRef} plain />
          </div>

          {/* ── Uploaded Documents ── */}
          <SubHeader title="Uploaded Documents" />
          <div className="rounded border border-stroke dark:border-dark-3 px-3 py-2.5">
            <p className="text-sm text-gray-400">No File Found</p>
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
            <button onClick={() => router.push("/personnel/admin/tapal/outgoing-tapal/list")}
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
