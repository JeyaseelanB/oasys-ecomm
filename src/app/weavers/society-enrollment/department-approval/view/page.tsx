"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STEPS = [
  "Receive Requisition Letter",
  "Supporting Document Collection",
  "Field Verification",
  "Head Office Approval",
  "Board Approval",
  "Society Code Allotment",
];

const RECORD = {
  societyType: "HANDLOOM",
  societyName: "tedsaddd",
  societyNameTamil: "tedsadd",
  societyRegistrationNumber: "757",
  societyRegistrationDate: "14-Feb-2025",
  societyProductionStartDate: "21-Feb-2025",
  societyResolutionDate: "21-Feb-2025",
  societyAddress: "SDFS, FSFSSFSF, SFSFSFFS, SALEM, SALEM, TAMIL NADU, - 464646",
  societyResolutionNumber: "75",
  adhtOfficeCode: "05 / SALEM",
  recommendedBy: "fgfhh",
  recommendedDate: "21-Feb-2025",
  societyPresidentName: "TESTING",
  presidentAddress: "SDFS, FSFSSFSF, SFSFSFFS, SALEM, SALEM, TAMIL NADU, - 464646",
  totalMembers: "34",
  demandDraftNumber: "6446",
  demandDraftDate: "21-Feb-2025",
  demandDraftAmount: "₹ 800.00",
  loomType: "HANDLOOM",
  numberOfLooms: "11",
  dpOfficeCode: "D&P Office Salem",
};

const SUPPORTING_DOCS = [
  "Form No.16 duly filled by the society to admit the society as Co-optex member.",
  "List of members attested by the deputy director of Handlooms and textiles.",
  "List of board members of the society.",
  "Declaration of society.",
  "By-law of the society duly attested by the Deputy Director of Handlooms and Textiles.",
  "D.D. for Rs.550/- for share capital.",
  "Society Resolution to join as member in Co-optex.",
  "Requisition of the society to admit as member in Co-optex.",
  "Recommendation letter from concerned Deputy Director of Handlooms and Textiles.",
  "Certificate of Registration issued by the Deputy Director of Handlooms & Textiles.",
  "Proceedings issued by the Deputy Director of Handlooms & Textiles, to commence the business of the society.",
];

const COMMITTEE_MEMBERS = [
  { staffCode: "3200 / SAMINATHAN S", designation: "DEPUTY GENERAL MANAGER", entityCode: "10 / HEAD OFFICE" },
];
const LOOM_VERIFICATION = [
  { memberName: "TEST", memberAddress: "21313, 3113, 313113.......", industryAddress: "REREER, 3535, 53353.......", numberOfLooms: "11.0", rationCard: "", aadhaar: "3424422422" },
];
const VISIT_DATE = "21-Feb-2025";
const FORWARD_FOR = "Final Approve";

const NOTES = [
  { id: 1, text: "cc", status: "SUBMITTED", name: "SANKARANARAYANAN C", designation: "SUPERINTENDENT", date: "21-Feb-2025" },
  { id: 2, text: "cc", status: "FINAL APPROVED", name: "USHA M", designation: "AUDITOR", date: "21-Feb-2025" },
  { id: 3, text: "cc", status: "DEPARTMENT SUBMITTED", name: "SANKARANARAYANAN C", designation: "SUPERINTENDENT", date: "21-Feb-2025" },
];

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1"/><rect x="10" y="2" width="4" height="4" rx="1"/>
    <rect x="2" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/>
  </svg>
);

const valCls = "text-sm font-medium text-[#17a2b8]";
const lblCls = "mb-0.5 text-xs text-gray-500 dark:text-gray-400";

export default function DepartmentApprovalViewPage() {
  const router = useRouter();
  const [docsOpen, setDocsOpen] = useState(true);
  const [fieldOpen, setFieldOpen] = useState(true);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Head Office Approval</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Society Enrollment</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Head Office Approval</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">

        {/* Stepper */}
        <div className="overflow-x-auto border-b border-stroke px-6 py-5 dark:border-dark-3">
          <div className="flex min-w-max items-start justify-between gap-2">
            {STEPS.map((step, i) => {
              const done = i < 3;
              const active = i === 3;
              return (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative flex w-full items-center">
                    {i > 0 && <div className={`h-0.5 flex-1 ${done || active ? "bg-green-400" : "bg-gray-200 dark:bg-dark-3"}`} />}
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      done ? "border-green-500 bg-green-500 text-white"
                      : active ? "border-orange-400 bg-white text-orange-400"
                      : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:bg-gray-dark"
                    }`}>
                      {done ? <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20,6 9,17 4,12"/></svg> : i + 1}
                    </div>
                    {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 ${done ? "bg-green-400" : "bg-gray-200 dark:bg-dark-3"}`} />}
                  </div>
                  <span className={`mt-1.5 text-center text-[11px] font-medium ${active ? "font-bold text-dark dark:text-white" : done ? "text-gray-500" : "text-gray-400"}`}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Society Details */}
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">Society Details</span>
        </div>

        <div className="p-5">
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-4">
            <div><p className={lblCls}>Society Type</p><p className={valCls}>{RECORD.societyType}</p></div>
            <div><p className={lblCls}>Society Name</p><p className={valCls}>{RECORD.societyName}</p></div>
            <div><p className={lblCls}>Society Name (In Tamil)</p><p className={valCls}>{RECORD.societyNameTamil}</p></div>
            <div><p className={lblCls}>Society Registration Number</p><p className={valCls}>{RECORD.societyRegistrationNumber}</p></div>
            <div><p className={lblCls}>Society Registration Date</p><p className={valCls}>{RECORD.societyRegistrationDate}</p></div>
            <div><p className={lblCls}>Society Production Start Date</p><p className={valCls}>{RECORD.societyProductionStartDate}</p></div>
            <div><p className={lblCls}>Society Resolution Date</p><p className={valCls}>{RECORD.societyResolutionDate}</p></div>
            <div><p className={lblCls}>Society Address</p><p className={valCls}>{RECORD.societyAddress}</p></div>
            <div><p className={lblCls}>Society Resolution Number</p><p className={valCls}>{RECORD.societyResolutionNumber}</p></div>
            <div>
              <p className={lblCls}>Recommendation Letter Received From</p>
              <button className="mt-0.5 flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/></svg>
              </button>
            </div>
            <div><p className={lblCls}>ADHT Office Code / Name</p><p className={valCls}>{RECORD.adhtOfficeCode}</p></div>
            <div><p className={lblCls}>Recommended by</p><p className={valCls}>{RECORD.recommendedBy}</p></div>
            <div><p className={lblCls}>Recommended Date</p><p className={valCls}>{RECORD.recommendedDate}</p></div>
          </div>

          {/* President + DD Details */}
          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white"><GridIcon /> Society President Details</h4>
              <div className="grid grid-cols-2 gap-3">
                <div><p className={lblCls}>Society President Name</p><p className={valCls}>{RECORD.societyPresidentName}</p></div>
                <div><p className={lblCls}>Society Address</p><p className={valCls}>{RECORD.presidentAddress}</p></div>
                <div><p className={lblCls}>Total Members in Society</p><p className={valCls}>{RECORD.totalMembers}</p></div>
              </div>
            </div>
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white"><GridIcon /> DD Details</h4>
              <div className="grid grid-cols-2 gap-3">
                <div><p className={lblCls}>Demand Draft Number</p><p className={valCls}>{RECORD.demandDraftNumber}</p></div>
                <div><p className={lblCls}>Demand Draft Date</p><p className={valCls}>{RECORD.demandDraftDate}</p></div>
                <div><p className={lblCls}>Demand Draft Amount</p><p className={valCls}>{RECORD.demandDraftAmount}</p></div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white"><GridIcon /> Product Details</h4>
            <div className="grid grid-cols-3 gap-3">
              <div><p className={lblCls}>Loom Type</p><p className={valCls}>{RECORD.loomType}</p></div>
              <div><p className={lblCls}>Number of Looms Available</p><p className={valCls}>{RECORD.numberOfLooms}</p></div>
              <div><p className={lblCls}>D&P Office Code</p><p className={valCls}>{RECORD.dpOfficeCode}</p></div>
            </div>
          </div>
        </div>

        {/* Attached Supporting Documents */}
        <div className="border-t border-stroke dark:border-dark-3">
          <div className="flex cursor-pointer items-center justify-between bg-[#17a2b8] px-5 py-3" onClick={() => setDocsOpen((o) => !o)}>
            <span className="text-sm font-semibold text-white">Attached Supporting Documents</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full border border-white px-2 py-0.5 font-semibold text-white">Total Files <span className="ml-1 rounded-full bg-white px-1.5 text-[#17a2b8]">12</span></span>
                <span className="rounded-full bg-[#28a745] px-2 py-0.5 font-semibold text-white">Attached <span className="ml-1 rounded-full bg-white px-1.5 text-[#28a745]">11</span></span>
                <span className="rounded-full bg-[#dc3545] px-2 py-0.5 font-semibold text-white">Remaining <span className="ml-1 rounded-full bg-white px-1.5 text-[#dc3545]">1</span></span>
              </div>
              <button className="text-lg font-bold text-white hover:opacity-70">{docsOpen ? "−" : "+"}</button>
            </div>
          </div>
          {docsOpen && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold">File Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold">File Path</th>
                    <th className="w-20 border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {SUPPORTING_DOCS.map((doc, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-[#1a2232]"}>
                      <td className="border-b border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 text-sm dark:border-dark-3">{doc}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 text-xs text-gray-500 dark:border-dark-3">/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf</td>
                      <td className="border-b border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <button className="mx-auto flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90">
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Field Verification */}
        <div className="border-t border-stroke dark:border-dark-3">
          <div className="flex cursor-pointer items-center justify-between border-b border-stroke px-5 py-3 dark:border-dark-3" onClick={() => setFieldOpen((o) => !o)}>
            <span className="text-sm font-semibold text-dark dark:text-white">Field Verification</span>
            <button className="text-lg font-bold text-gray-400 hover:opacity-70">{fieldOpen ? "−" : "+"}</button>
          </div>
          {fieldOpen && (
            <div className="space-y-5 p-5">
              {/* Committee Members */}
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white"><GridIcon /> Committee Members List</h4>
                <p className="mb-1 text-xs text-gray-500">Date of Visit to the Society</p>
                <p className="mb-3 text-sm font-medium text-[#17a2b8]">{VISIT_DATE}</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#2d8f7b] text-white">
                        <th className="w-10 border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">#</th>
                        <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Employee PF Number / Name</th>
                        <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Designation</th>
                        <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Entity Code / Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMMITTEE_MEMBERS.map((m, i) => (
                        <tr key={i} className="bg-white dark:bg-gray-dark">
                          <td className="border-b border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{i + 1}</td>
                          <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{m.staffCode}</td>
                          <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{m.designation}</td>
                          <td className="border-b border-stroke px-3 py-2 dark:border-dark-3">{m.entityCode}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Loom Verification */}
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white"><GridIcon /> Loom Verification List</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#2d8f7b] text-white">
                        <th className="w-10 border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">#</th>
                        <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Member Name</th>
                        <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Member Address</th>
                        <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Industry Address</th>
                        <th className="border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">Number of Looms</th>
                        <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Ration Card Number</th>
                        <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Aadhaar Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LOOM_VERIFICATION.map((l, i) => (
                        <tr key={i} className="bg-white dark:bg-gray-dark">
                          <td className="border-b border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{i + 1}</td>
                          <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{l.memberName}</td>
                          <td className="border-b border-r border-stroke px-3 py-2 text-xs dark:border-dark-3">{l.memberAddress}</td>
                          <td className="border-b border-r border-stroke px-3 py-2 text-xs dark:border-dark-3">{l.industryAddress}</td>
                          <td className="border-b border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{l.numberOfLooms}</td>
                          <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{l.rationCard}</td>
                          <td className="border-b border-stroke px-3 py-2 dark:border-dark-3">{l.aadhaar}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Flags */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Is the society is properly registered under ADHT office</p>
                  <p className="text-sm font-medium text-[#17a2b8]">No</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Is the committee recommended to allot the society code</p>
                  <p className="text-sm font-medium text-[#17a2b8]">Yes</p>
                </div>
              </div>

              {/* Forward Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1 text-sm font-medium text-dark dark:text-white">Forward To</p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-dark dark:text-white">Forward For</p>
                  <p className={valCls}>{FORWARD_FOR}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-stroke px-5 py-4 dark:border-dark-3">
          <div className="flex items-center gap-2">
            <button onClick={() => { setNoteIndex(0); setShowNoteModal(true); }} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              View Note
            </button>
            <button className="flex size-8 items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90" title="Comments">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            </button>
          </div>
          <button onClick={() => router.push("/weavers/society-enrollment/department-approval/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Back
          </button>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-75">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-1 border-b border-stroke px-4 py-2 text-xs text-gray-400 dark:border-dark-3">
              {["Sans Serif", "Normal", "B", "I", "U", "S"].map((t, i) => <span key={i} className="rounded px-1.5 py-0.5 text-gray-400">{t}</span>)}
            </div>
            <div className="p-4">
              <div className="min-h-[120px] rounded border border-stroke bg-gray-50 p-3 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                {NOTES[noteIndex]?.text}
              </div>
              <div className="mt-2 flex items-center justify-end gap-2">
                {NOTES.map((_, i) => (
                  <button key={i} onClick={() => setNoteIndex(i)} className={`size-2 rounded-full ${noteIndex === i ? "bg-[#17a2b8]" : "bg-gray-300"}`} />
                ))}
                <button onClick={() => setNoteIndex((i) => Math.max(0, i - 1))} className="text-gray-400 hover:text-gray-600">‹</button>
                <button onClick={() => setNoteIndex((i) => Math.min(NOTES.length - 1, i + 1))} className="text-gray-400 hover:text-gray-600">›</button>
              </div>

              {/* Notes carousel showing all 3 status cards */}
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {NOTES.map((note, i) => (
                  <div key={i} className="rounded border border-orange-300 p-3 text-xs text-dark dark:text-white">
                    <p className="mb-1.5 text-center font-semibold">{note.status}</p>
                    <p>Name : {note.name}</p>
                    <p>Designation : {note.designation}</p>
                    <p>Date : {note.date}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
