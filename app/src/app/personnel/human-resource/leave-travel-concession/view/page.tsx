"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewLeaveTravelConcessionPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteSlide, setNoteSlide] = useState(0);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showHolidayDatesModal, setShowHolidayDatesModal] = useState(false);

  const notes = [
    {
      content: "Leave travel concession approved for the employee as per policy guidelines.",
      cards: [
        { title: "", name: "174 / LAVANYA M", designation: "JUNIOR ASSISTANT", date: "07-10-2024" },
        { title: "Final Approved By", name: "261 / USHA M", designation: "JUNIOR ASSISTANT", date: "07-10-2024" },
        { title: "", name: "174 / LAVANYA M", designation: "JUNIOR ASSISTANT", date: "08-10-2024" },
      ],
    },
  ];

  const billDocuments = [
    { sNo: 1, documentName: "Travel_Bill_Receipt.pdf", uploadedDate: "18-Nov-2024" },
    { sNo: 2, documentName: "Ticket_Booking.pdf", uploadedDate: "19-Nov-2024" },
  ];

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Leave Travel Concession</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Leave Travel Concession</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">Leave Travel Concession</h3>
        </div>

        <div className="p-5">
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#17a2b8]">SALEM</p></div>
            <div><p className="text-xs text-gray-500">Entity Type</p><p className="text-sm font-medium text-[#17a2b8]">Distribution Warehouse</p></div>
            <div><p className="text-xs text-gray-500">Entity Code</p><p className="text-sm font-medium text-[#17a2b8]">DWH - SALEM</p></div>
            <div><p className="text-xs text-gray-500">Department Code</p><p className="text-sm font-medium text-[#17a2b8]">MARKETING</p></div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Section</p><p className="text-sm font-medium text-[#17a2b8]">GENERAL</p></div>
            <div><p className="text-xs text-gray-500">Employee PF</p><p className="text-sm font-medium text-[#17a2b8]">174 / LAVANYA M</p></div>
            <div><p className="text-xs text-gray-500">Block Year</p><p className="text-sm font-medium text-[#17a2b8]">2024-2027</p></div>
            <div><p className="text-xs text-gray-500">Eligible Distance (KM)</p><p className="text-sm font-medium text-[#17a2b8]">500</p></div>
          </div>

          {/* Row 3 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">From Date</p><p className="text-sm font-medium text-[#17a2b8]">18-Nov-2024</p></div>
            <div><p className="text-xs text-gray-500">To Date</p><p className="text-sm font-medium text-[#17a2b8]">26-Nov-2024</p></div>
            <div><p className="text-xs text-gray-500">No. of Days</p><p className="text-sm font-medium text-[#17a2b8]">5</p></div>
            <div><p className="text-xs text-gray-500">Travelled Distance (KM)</p><p className="text-sm font-medium text-[#17a2b8]">450</p></div>
          </div>

          {/* Row 4 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Applied For</p><p className="text-sm font-medium text-[#17a2b8]">Self</p></div>
            <div><p className="text-xs text-gray-500">Mode of Travel</p><p className="text-sm font-medium text-[#17a2b8]">Train</p></div>
            <div><p className="text-xs text-gray-500">Travel Class</p><p className="text-sm font-medium text-[#17a2b8]">Sleeper Class</p></div>
            <div><p className="text-xs text-gray-500">Type of Leave</p><p className="text-sm font-medium text-[#17a2b8]">Earned Leave</p></div>
          </div>

          {/* Row 5 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Leave Balance</p><p className="text-sm font-medium text-[#17a2b8]">15</p></div>
            <div><p className="text-xs text-gray-500">Leave From Date</p><p className="text-sm font-medium text-[#17a2b8]">18-Nov-2024</p></div>
            <div><p className="text-xs text-gray-500">Leave To Date</p><p className="text-sm font-medium text-[#17a2b8]">26-Nov-2024</p></div>
            <div><p className="text-xs text-gray-500">No. of Days</p><p className="text-sm font-medium text-[#17a2b8]">5</p></div>
          </div>

          {/* Row 6 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Cost of Ticket</p><p className="text-sm font-medium text-[#17a2b8]">1500</p></div>
            <div><p className="text-xs text-gray-500">Whether holiday permissions required</p><p className="text-sm font-medium text-[#17a2b8]">No</p></div>
            <div><p className="text-xs text-gray-500">Created Date</p><p className="text-sm font-medium text-[#17a2b8]">18-Nov-2024</p></div>
            <div>
              <p className="text-xs text-gray-500">Uploaded Documents :</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-dark dark:text-white">travel_documents.pdf</span>
                <button className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium text-white hover:opacity-90" style={{ backgroundColor: "#17a2b8" }}>
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* View Members & View Holiday Dates Buttons */}
          <div className="mb-4 flex items-center gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowMembersModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              View Members
            </button>
            <button onClick={() => setShowHolidayDatesModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              View Holiday Dates
            </button>
          </div>

          {/* Add Leave Bills Documents Section */}
          <div className="mb-4 border-t border-stroke pt-4 dark:border-dark-3">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
              Add Leave Bills Documents
            </h4>

            <div className="mb-3 flex items-center gap-4">
              <input type="file" className="w-full max-w-md rounded border border-stroke px-3 py-2 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              <button className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#17a2b8" }}>
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Upload
              </button>
            </div>

            {/* Bills Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr style={{ backgroundColor: "#26A69A" }}>
                    <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">S.No</th>
                    <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">Document Name</th>
                    <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">Uploaded Date</th>
                    <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billDocuments.map((doc) => (
                    <tr key={doc.sNo} className="hover:bg-gray-50 dark:hover:bg-dark-2">
                      <td className="border border-stroke px-3 py-2 text-sm text-dark dark:border-dark-3 dark:text-white">{doc.sNo}</td>
                      <td className="border border-stroke px-3 py-2 text-sm text-dark dark:border-dark-3 dark:text-white">{doc.documentName}</td>
                      <td className="border border-stroke px-3 py-2 text-sm text-dark dark:border-dark-3 dark:text-white">{doc.uploadedDate}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">
                        <div className="flex items-center gap-2">
                          <button className="text-[#17a2b8] hover:opacity-80" title="Download">
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          </button>
                          <button className="text-[#dc3545] hover:opacity-80" title="Delete">
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Forward Section */}
          <div className="mb-5 border-t border-stroke pt-4 dark:border-dark-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#495057]">Forward To <span className="text-[#dc3545]">*</span></label>
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                  </span>
                  <input type="text" readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#495057]">Forward For <span className="text-[#dc3545]">*</span></label>
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                  </span>
                  <select defaultValue="Approval" className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                    <option value="Approval">Approval</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Note
            </button>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
                Submit
              </button>
              <button onClick={() => router.push("/personnel/human-resource/leave-travel-concession/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4 min-h-[120px] rounded border border-stroke bg-gray-50 p-4 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                {notes[noteSlide]?.content}
              </div>

              <div className="mb-4 flex items-center justify-end gap-2">
                <div className="flex items-center gap-1.5">
                  {notes.map((_, idx) => (
                    <button key={idx} onClick={() => setNoteSlide(idx)} className={`size-2.5 rounded-full ${noteSlide === idx ? "bg-primary" : "bg-gray-300 dark:bg-dark-3"}`} />
                  ))}
                </div>
                <button onClick={() => setNoteSlide((s) => Math.max(0, s - 1))} disabled={noteSlide === 0} className="text-gray-400 hover:text-dark disabled:opacity-30 dark:hover:text-white">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                </button>
                <button onClick={() => setNoteSlide((s) => Math.min(notes.length - 1, s + 1))} disabled={noteSlide === notes.length - 1} className="text-gray-400 hover:text-dark disabled:opacity-30 dark:hover:text-white">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
                </button>
              </div>

              {/* Note Cards */}
              <div className="mb-4 flex items-start gap-4">
                {notes[noteSlide]?.cards.map((card, idx) => (
                  <div key={idx} className="flex-1">
                    <div className="border-t-2 border-[#E67E22]"></div>
                    <div className="rounded-b border border-t-0 border-stroke p-4 dark:border-dark-3">
                      {card.title && <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">{card.title}</p>}
                      <p className="text-xs text-dark dark:text-white">Name : <span className="font-semibold">{card.name}</span></p>
                      <p className="text-xs text-dark dark:text-white">Designation : <span className="font-semibold text-[#17a2b8]">{card.designation}</span></p>
                      <p className="text-xs text-dark dark:text-white">Date : <span className="font-semibold">{card.date}</span></p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Members Modal */}
      {showMembersModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
              <h3 className="text-sm font-semibold text-white">View Members</h3>
              <button onClick={() => setShowMembersModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr style={{ backgroundColor: "#26A69A" }}>
                      <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">S.No</th>
                      <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">Member Name</th>
                      <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">Relationship</th>
                      <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} className="border border-stroke px-3 py-4 text-center text-sm text-gray-500 dark:border-dark-3">No records found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setShowMembersModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Holiday Dates Modal */}
      {showHolidayDatesModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
              <h3 className="text-sm font-semibold text-white">View Holiday Dates</h3>
              <button onClick={() => setShowHolidayDatesModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr style={{ backgroundColor: "#26A69A" }}>
                      <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">S.No</th>
                      <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">From Date</th>
                      <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">To Date</th>
                      <th className="border border-white/30 px-3 py-2.5 text-left text-xs font-semibold text-white">No. of Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} className="border border-stroke px-3 py-4 text-center text-sm text-gray-500 dark:border-dark-3">No records found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setShowHolidayDatesModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
