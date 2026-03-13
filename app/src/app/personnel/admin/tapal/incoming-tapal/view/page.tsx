"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

/* Read-only field — label + teal value */
const VF = ({ label, value, plain = false }: { label: string; value: string; plain?: boolean }) => (
  <div className="border-b border-stroke py-2 last:border-0 dark:border-dark-3">
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className={`mt-0.5 text-sm font-medium ${plain ? "text-dark dark:text-white" : "text-[#2d8f7b]"}`}>
      {value || "—"}
    </p>
  </div>
);

interface NoteItem { title: string; content: string; date: string; author: string; initials: string }

const TAPAL = {
  receivedDate: "08-Nov-2024", deliveryType: "Registered Post", noOfLetters: "",
  toWhom: "Individual", referenceNumber: "R10Y2024-00002", referenceDate: "06-Nov-2024",
  type: "Personal", employeeName: "SANKARANARAYANAN C", subject: "",
  senderType: "Government Department", senderName: "aba", tapalRefNumber: "123456",
  tapalRefDate: "06-Nov-2024", addressLine1: "qretyjfukgi", addressLine2: "DASFDzxbnvbm",
  state: "MUMBAI", district: "MULUND", pincode: "1234", paymentDetails: "No",
};

const NOTES: NoteItem[] = [
  { title: "Tapal Processing Note",  content: "Incoming tapal received and verified. Document has been forwarded to the concerned department for further action.", date: "25 Nov 2024", author: "Admin Officer",  initials: "AO" },
  { title: "Follow-up Note",         content: "Reminder sent to the department head regarding the pending action on this tapal.",                                   date: "30 Nov 2024", author: "Section Head",  initials: "SH" },
];

const UPLOADED_DOCS: { id: number; name: string }[] = [];

export default function ViewIncomingTapalPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [activeNote,    setActiveNote]    = useState(0);

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Incoming Tapal</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Tapal</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Incoming Tapal</li>
          </ol>
        </nav>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="rounded-t-[10px] px-5 py-3" style={{ background: "#2d8f7b" }}>
          <h3 className="text-sm font-semibold text-white">View Incoming Tapal</h3>
        </div>

        <div className="p-5">
          {/* ── Tapal Details ── */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <VF label="Received Date"    value={TAPAL.receivedDate} />
            <VF label="Delivery Type"    value={TAPAL.deliveryType} />
            <VF label="No of Letters"    value={TAPAL.noOfLetters} plain />
            <VF label="To Whom"          value={TAPAL.toWhom} />
            <VF label="Reference Number" value={TAPAL.referenceNumber} />
            <VF label="Reference Date"   value={TAPAL.referenceDate} />
            <VF label="Type"             value={TAPAL.type} />
            <VF label="Employee Name"    value={TAPAL.employeeName} />
          </div>
          <div className="mt-1">
            <VF label="Subject" value={TAPAL.subject} plain />
          </div>

          {/* ── Sender Details ── */}
          <SubHeader title="Sender Details" />
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <VF label="Sender Type"            value={TAPAL.senderType} />
            <VF label="Sender Name"            value={TAPAL.senderName} />
            <VF label="Tapal Reference Number" value={TAPAL.tapalRefNumber} />
            <VF label="Tapal Reference Date"   value={TAPAL.tapalRefDate} />
            <VF label="Address Line 1"         value={TAPAL.addressLine1} />
            <VF label="Address Line 2"         value={TAPAL.addressLine2} />
            <VF label="State"                  value={TAPAL.state} />
            <VF label="District"               value={TAPAL.district} />
            <VF label="Pincode"                value={TAPAL.pincode} />
            <VF label="Payment Details"        value={TAPAL.paymentDetails} plain />
          </div>

          {/* ── Uploaded Documents ── */}
          <SubHeader title="Uploaded Documents" />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold text-white w-12">#</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold text-white">Document Name</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-white w-28">Action</th>
                </tr>
              </thead>
              <tbody>
                {UPLOADED_DOCS.length === 0 ? (
                  <tr className="bg-white dark:bg-gray-dark">
                    <td colSpan={3} className="px-3 py-4 text-xs text-gray-400">No records found.</td>
                  </tr>
                ) : UPLOADED_DOCS.map((doc, idx) => (
                  <tr key={doc.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}`}>
                    <td className="px-3 py-2 text-center text-xs text-gray-500">{idx + 1}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{doc.name}</td>
                    <td className="px-3 py-2 text-center">
                      <button className="flex h-7 w-7 items-center justify-center rounded text-xs font-bold text-white" style={{ background: "#28a745" }}>↓</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Bottom action row ── */}
          <div className="mt-5 flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowNoteModal(true)}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                View Note
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90" title="Forward">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </button>
            </div>
            <button onClick={() => router.push("/personnel/admin/tapal/incoming-tapal/list")}
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

                  {/* Created By */}
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

                  {/* Dot nav */}
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
