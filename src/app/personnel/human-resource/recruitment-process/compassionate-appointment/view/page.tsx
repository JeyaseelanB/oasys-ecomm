"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UploadedDocument {
  id: number;
  document: string;
  fileName: string;
}

const UPLOADED_DOCUMENTS: UploadedDocument[] = [
  { id: 1, document: "Death Certificate", fileName: "death_certificate.pdf" },
  { id: 2, document: "Qualification Certificate", fileName: "qualification_cert.pdf" },
  { id: 3, document: "Legal Heir Certificate", fileName: "legal_heir_cert.pdf" },
  { id: 4, document: "Requisition Letter from Applicant", fileName: "requisition_letter.pdf" },
];

interface NoteItem {
  id: number;
  content: string;
  createdBy: string;
  designation: string;
  date: string;
}

const NOTES: NoteItem[] = [
  { id: 1, content: "Compassionate appointment application reviewed. All mandatory documents verified. Forwarding for approval.", createdBy: "SANKARANARAYANAN", designation: "ASSISTANT SALES MAN", date: "13-Mar-2026" },
  { id: 2, content: "Initial application submitted with required documents. PF details verified against records.", createdBy: "RAJESH KUMAR", designation: "REGIONAL MANAGER", date: "10-Mar-2026" },
];

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function ViewCompassionateAppointmentPage() {
  const router = useRouter();
  const basePath = "/personnel/human-resource/recruitment-process/compassionate-appointment";
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsTab, setCommentsTab] = useState<"approve" | "reject">("approve");
  const [approveComment, setApproveComment] = useState("");
  const [rejectComment, setRejectComment] = useState("");

  const pfNumber = "3535 / 460";
  const nameOfDeceased = "SUJATHA";
  const dateOfBirth = "19-Jun-1981";
  const dateOfAppointment = "07-Jun-2012";
  const designation = "DEPUTY REGIONAL MANAGER (ADMIN)";
  const hoRo = "CUDDALORE";
  const entityType = "Regional Office";
  const entity = "CUDDALORE";
  const dateOfDeath = "05-May-2023";
  const dateOfSuperannuation = "30-Jun-2041";
  const nameOfLegalHeir = "T.KAMALAKKANNAN";
  const relationship = "Son";
  const legalHeirDob = "15-Mar-1999";
  const gender = "Male";
  const highestQualification = "12TH";
  const specialization = "Commerce";
  const postEligible = "ASSISTANT SALES MAN";
  const maritalStatus = "Single";
  const address = "12, South Street, Chidambaram, CUDDALORE, TAMIL NADU, India, - 608001";
  const isWorkingCurrently = "No";
  const willingToWorkAnyPost = "Yes";
  const willingToRelocate = "Yes";
  const finalSettlement = "No";
  const birthCertificate = "Yes";
  const agreementFromLegalHeir = "No";
  const outstandingDue = "0.00";
  const remarks = "Compassionate appointment requested for legal heir.";
  const forwardTo = "MANAGER - HR";
  const forwardFor = "Approval";

  const ReadOnlyRadio = ({ label, value }: { label: string; value: string }) => (
    <div>
      <label className="mb-1 block text-xs font-medium text-dark dark:text-white">{label}</label>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1.5 text-sm text-dark dark:text-white"><input type="radio" name={label} value="Yes" checked={value === "Yes"} readOnly className="size-3.5 accent-primary" /> Yes</label>
        <label className="flex items-center gap-1.5 text-sm text-dark dark:text-white"><input type="radio" name={label} value="No" checked={value === "No"} readOnly className="size-3.5 accent-primary" /> No</label>
      </div>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Compassionate Appointment</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Recruitment Process</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Compassionate Appointment</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Compassionate Appointment</h3>
        </div>

        <div className="p-5">
          {/* PF Number */}
          <div className="mb-6 w-80">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Deceased Employee&apos;s PF Number / ID</label>
            <div className="flex">
              <IconBox><span className="text-sm font-bold">#</span></IconBox>
              <input type="text" value={pfNumber} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
            </div>
          </div>

          {/* Row 1: Employee Details */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Name of the Deceased Employee</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><input type="text" value={nameOfDeceased} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Birth</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox><input type="text" value={dateOfBirth} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Appointment</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox><input type="text" value={dateOfAppointment} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Designation</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><input type="text" value={designation} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">HO/RO</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox><input type="text" value={hoRo} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity Type</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox><input type="text" value={entityType} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox><input type="text" value={entity} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Death</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox><input type="text" value={dateOfDeath} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
          </div>

          {/* Row 3: Legal Heir */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Superannuation</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox><input type="text" value={dateOfSuperannuation} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Name of Legal Heir</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><input type="text" value={nameOfLegalHeir} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Relationship</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></IconBox><input type="text" value={relationship} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Birth</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox><input type="text" value={legalHeirDob} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
          </div>

          {/* Row 4 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Gender</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><input type="text" value={gender} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Highest Qualification</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg></IconBox><input type="text" value={highestQualification} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Address</label><div className="min-h-[60px] rounded border border-stroke bg-gray-50 p-2 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">{address}</div></div>
          </div>

          {/* Row 5 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Specialization</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg></IconBox><input type="text" value={specialization} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Post Eligible</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><input type="text" value={postEligible} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
          </div>

          {/* Marital Status */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Marital Status</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><input type="text" value={maritalStatus} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
          </div>

          {/* Additional Requirements (read-only) */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Additional Requirements</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <ReadOnlyRadio label="Whether the Applicant is Working Currently" value={isWorkingCurrently} />
              <ReadOnlyRadio label="Whether the Applicant is Willing to work for any Post" value={willingToWorkAnyPost} />
              <ReadOnlyRadio label="Whether the Applicant is Willing to Relocate" value={willingToRelocate} />
              <ReadOnlyRadio label="Whether the Final Settlement has been made to the Legal Heir" value={finalSettlement} />
              <ReadOnlyRadio label="Birth Certificate" value={birthCertificate} />
              <ReadOnlyRadio label="Any Agreement Obtained from Legal Heir for Recovery of Outstanding" value={agreementFromLegalHeir} />
            </div>
          </div>

          {/* Outstanding Due */}
          <div className="mb-6 w-80">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Any Outstanding due from the Deceased Employee</label>
            <div className="flex">
              <IconBox><span className="text-sm font-bold">&#8377;</span></IconBox>
              <input type="text" value={outstandingDue} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-right outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Document</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">File Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {UPLOADED_DOCUMENTS.map((doc, idx) => (
                  <tr key={doc.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3">{doc.document}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                      <a href="#" className="text-[#17a2b8] hover:underline">{doc.fileName}</a>
                    </td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                      <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 mx-auto">
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Remarks */}
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Remarks</label>
            <div className="min-h-[60px] rounded border border-stroke bg-gray-50 p-3 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">{remarks}</div>
          </div>

          {/* Forward To / Forward For */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></IconBox>
                <input type="text" value={forwardTo} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></IconBox>
                <input type="text" value={forwardFor} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <div className="flex items-center gap-3">
              <button onClick={() => { setCurrentNoteIndex(0); setShowNoteModal(true); }} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View Note
              </button>
              <button onClick={() => setShowCommentsModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                Comments
              </button>
            </div>
            <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note ({currentNoteIndex + 1} of {NOTES.length})</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="p-5">
              <div className="mb-4 min-h-[120px] rounded border border-stroke bg-gray-50 p-3 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                {NOTES[currentNoteIndex]?.content}
              </div>
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded border border-stroke px-8 py-4 text-center dark:border-dark-3">
                  <p className="mb-2 text-sm font-semibold text-dark dark:text-white">Created By</p>
                  <p className="text-xs text-dark dark:text-white">Name : {NOTES[currentNoteIndex]?.createdBy}</p>
                  <p className="text-xs text-dark dark:text-white">Designation : {NOTES[currentNoteIndex]?.designation}</p>
                  <p className="text-xs text-dark dark:text-white">Date : {NOTES[currentNoteIndex]?.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => setCurrentNoteIndex((i) => Math.max(0, i - 1))} disabled={currentNoteIndex === 0} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>Previous
                </button>
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Close</button>
                <button onClick={() => setCurrentNoteIndex((i) => Math.min(NOTES.length - 1, i + 1))} disabled={currentNoteIndex === NOTES.length - 1} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
                  Next<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showCommentsModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Comments</h3>
              <button onClick={() => setShowCommentsModal(false)} className="text-white hover:opacity-80"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="p-5">
              {/* Tabs */}
              <div className="mb-4 flex border-b border-stroke dark:border-dark-3">
                <button onClick={() => setCommentsTab("approve")} className={`px-4 py-2 text-sm font-medium ${commentsTab === "approve" ? "border-b-2 border-[#28a745] text-[#28a745]" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}>
                  <span className="flex items-center gap-1.5"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Approve</span>
                </button>
                <button onClick={() => setCommentsTab("reject")} className={`px-4 py-2 text-sm font-medium ${commentsTab === "reject" ? "border-b-2 border-[#dc3545] text-[#dc3545]" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}>
                  <span className="flex items-center gap-1.5"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Reject</span>
                </button>
              </div>

              {commentsTab === "approve" ? (
                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Approve Comments</label>
                  <textarea value={approveComment} onChange={(e) => setApproveComment(e.target.value)} rows={4} placeholder="Enter approval comments..." className="mb-4 w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                  <div className="flex justify-end gap-3">
                    <button onClick={() => setShowCommentsModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel</button>
                    <button onClick={() => setShowCommentsModal(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Approve</button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Reject Comments</label>
                  <textarea value={rejectComment} onChange={(e) => setRejectComment(e.target.value)} rows={4} placeholder="Enter rejection reason..." className="mb-4 w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                  <div className="flex justify-end gap-3">
                    <button onClick={() => setShowCommentsModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel</button>
                    <button onClick={() => setShowCommentsModal(false)} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2 text-sm font-medium text-white hover:opacity-90"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Reject</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
