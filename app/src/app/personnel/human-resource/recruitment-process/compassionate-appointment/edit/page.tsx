"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

interface DocumentRow {
  id: number;
  document: string;
  required: boolean;
  fileName: string;
  fileData: File | null;
}

const DOCUMENT_LIST: DocumentRow[] = [
  { id: 1, document: "Death Certificate", required: true, fileName: "death_certificate.pdf", fileData: null },
  { id: 2, document: "Qualification Certificate", required: true, fileName: "qualification_cert.pdf", fileData: null },
  { id: 3, document: "Legal Heir Certificate", required: true, fileName: "legal_heir_cert.pdf", fileData: null },
  { id: 4, document: "No Objection Certificate from other legal heirs, if any", required: false, fileName: "", fileData: null },
  { id: 5, document: "Transfer Certificate", required: false, fileName: "", fileData: null },
  { id: 6, document: "Requisition letter from Deceased Employee's Wife/Husband", required: false, fileName: "", fileData: null },
  { id: 7, document: "Requisition Letter from Applicant", required: false, fileName: "requisition_letter.pdf", fileData: null },
  { id: 8, document: "Whether the Applicant is Working Currently", required: false, fileName: "", fileData: null },
  { id: 9, document: "Whether the Applicant is Willing to work for any Post", required: false, fileName: "", fileData: null },
  { id: 10, document: "Whether the Applicant is Willing to Relocate", required: false, fileName: "", fileData: null },
  { id: 11, document: "Whether the Final Settlement has been made to the Legal Heir", required: false, fileName: "", fileData: null },
  { id: 12, document: "Birth Certificate", required: false, fileName: "", fileData: null },
  { id: 13, document: "Any Agreement Obtained from Legal Heir for Recovery of Outstanding", required: false, fileName: "", fileData: null },
];

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function EditCompassionateAppointmentPage() {
  const router = useRouter();
  const basePath = "/personnel/human-resource/recruitment-process/compassionate-appointment";

  // Read-only employee fields
  const [pfNumber] = useState("3535 / 460");
  const [nameOfDeceased] = useState("SUJATHA");
  const [dateOfBirth] = useState("19-Jun-1981");
  const [dateOfAppointment] = useState("07-Jun-2012");
  const [designation] = useState("DEPUTY REGIONAL MANAGER (ADMIN)");
  const [hoRo] = useState("CUDDALORE");
  const [entityType] = useState("Regional Office");
  const [entity] = useState("CUDDALORE");
  const [dateOfDeath] = useState("05-May-2023");
  const [dateOfSuperannuation] = useState("30-Jun-2041");

  // Editable fields
  const [nameOfLegalHeir, setNameOfLegalHeir] = useState("T.KAMALAKKANNAN");
  const [relationship, setRelationship] = useState("Son");
  const [legalHeirDob, setLegalHeirDob] = useState("15-Mar-1999");
  const [gender, setGender] = useState("Male");
  const [highestQualification, setHighestQualification] = useState("12TH");
  const [specialization, setSpecialization] = useState("Commerce");
  const [postEligible, setPostEligible] = useState("ASSISTANT SALES MAN");
  const [maritalStatus, setMaritalStatus] = useState("Single");
  const [address, setAddress] = useState("12, South Street, Chidambaram, CUDDALORE, TAMIL NADU, India, - 608001");
  const [isWorkingCurrently, setIsWorkingCurrently] = useState("No");
  const [willingToWorkAnyPost, setWillingToWorkAnyPost] = useState("Yes");
  const [willingToRelocate, setWillingToRelocate] = useState("Yes");
  const [finalSettlement, setFinalSettlement] = useState("No");
  const [birthCertificate, setBirthCertificate] = useState("Yes");
  const [agreementFromLegalHeir, setAgreementFromLegalHeir] = useState("No");
  const [outstandingDue, setOutstandingDue] = useState("0.00");
  const [documents, setDocuments] = useState<DocumentRow[]>(DOCUMENT_LIST);
  const [remarks, setRemarks] = useState("Compassionate appointment requested for legal heir.");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("Approval");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showMandatoryFields, setShowMandatoryFields] = useState(true);

  const [addr, setAddr] = useState({
    line1: "12", line2: "South Street", line3: "",
    localLine1: "Chidambaram", localLine2: "", localLine3: "",
    country: "India", state: "TAMIL NADU", district: "CUDDALORE",
    city: "CUDDALORE", postalCode: "608001", taluk: "", landmark: "",
  });

  // Hidden file input refs per document row
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const handleFileChange = (docId: number, file: File | null) => {
    if (!file) return;
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, PNG files are allowed.");
      return;
    }
    if (file.size > 200 * 1024) {
      alert("File size must be less than 200KB.");
      return;
    }
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, fileName: file.name, fileData: file } : d))
    );
  };

  const handleRemoveFile = (docId: number) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, fileName: "", fileData: null } : d))
    );
    if (fileInputRefs.current[docId]) {
      fileInputRefs.current[docId]!.value = "";
    }
  };

  const noteName = "SANKARANARAYANAN";
  const noteDesignation = "ASSISTANT SALES MAN";
  const noteDate = "13-Mar-2026";

  const RadioGroup = ({
    label,
    required,
    value,
    onChange,
  }: {
    label: string;
    required?: boolean;
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div>
      <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1.5 text-sm text-dark dark:text-white">
          <input type="radio" name={label} value="Yes" checked={value === "Yes"} onChange={(e) => onChange(e.target.value)} className="size-3.5 accent-primary" /> Yes
        </label>
        <label className="flex items-center gap-1.5 text-sm text-dark dark:text-white">
          <input type="radio" name={label} value="No" checked={value === "No"} onChange={(e) => onChange(e.target.value)} className="size-3.5 accent-primary" /> No
        </label>
      </div>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Edit Compassionate Appointment
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Recruitment Process</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Compassionate Appointment</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Compassionate Appointment</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white">
              ( <span className="text-red-300">*</span> Mandatory Fields)
            </span>
            <button
              onClick={() => setShowMandatoryFields(!showMandatoryFields)}
              className="text-white hover:opacity-80"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* PF Number (read-only in edit) */}
          <div className="mb-6 flex items-end gap-3">
            <div className="w-80">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                Deceased Employee&apos;s PF Number / ID <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input
                  type="text"
                  value={pfNumber}
                  readOnly
                  className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Row 1: Employee Details (read-only) */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Name of the Deceased Employee</label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><input type="text" value={nameOfDeceased} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Birth</label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox><input type="text" value={dateOfBirth} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Appointment</label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox><input type="text" value={dateOfAppointment} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Designation</label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><input type="text" value={designation} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">HO/RO</label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox><input type="text" value={hoRo} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity Type</label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox><input type="text" value={entityType} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity</label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox><input type="text" value={entity} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Death</label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox><input type="text" value={dateOfDeath} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div>
            </div>
          </div>

          {/* Row 3: Legal Heir Details */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Superannuation</label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox><input type="text" value={dateOfSuperannuation} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Name of Legal Heir <span className="text-red-500">*</span></label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><input type="text" value={nameOfLegalHeir} onChange={(e) => setNameOfLegalHeir(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Relationship <span className="text-red-500">*</span></label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></IconBox><select value={relationship} onChange={(e) => setRelationship(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="Husband">Husband</option><option value="Wife">Wife</option><option value="Son">Son</option><option value="Daughter">Daughter</option></select></div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Birth <span className="text-red-500">*</span></label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox><input type="text" placeholder="dd-MMM-yyyy" value={legalHeirDob} onChange={(e) => setLegalHeirDob(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Gender <span className="text-red-500">*</span></label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option></select></div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Highest Qualification <span className="text-red-500">*</span></label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg></IconBox><select value={highestQualification} onChange={(e) => setHighestQualification(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="10TH">10TH</option><option value="12TH">12TH</option><option value="UG">UG</option><option value="PG">PG</option><option value="DIPLOMA">DIPLOMA</option></select></div>
            </div>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Address</label>
                <div className="min-h-[60px] rounded border border-stroke bg-gray-50 p-2 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">{address || ""}</div>
              </div>
              <button
                onClick={() => setShowAddressModal(true)}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Update
              </button>
            </div>
          </div>

          {/* Row 5 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Specialization <span className="text-red-500">*</span></label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg></IconBox><input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Post Eligible <span className="text-red-500">*</span></label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><select value={postEligible} onChange={(e) => setPostEligible(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="ASSISTANT SALES MAN">ASSISTANT SALES MAN</option><option value="JUNIOR CLERK">JUNIOR CLERK</option><option value="PEON">PEON</option></select></div>
            </div>
          </div>

          {/* Marital Status */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Marital Status <span className="text-red-500">*</span></label>
              <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox><select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="Married">Married</option><option value="Single">Single</option><option value="Widowed">Widowed</option></select></div>
            </div>
          </div>

          {/* Additional Requirements */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Additional Requirements</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <RadioGroup label="Whether the Applicant is Working Currently" required value={isWorkingCurrently} onChange={setIsWorkingCurrently} />
              <RadioGroup label="Whether the Applicant is Willing to work for any Post" required value={willingToWorkAnyPost} onChange={setWillingToWorkAnyPost} />
              <RadioGroup label="Whether the Applicant is Willing to Relocate" required value={willingToRelocate} onChange={setWillingToRelocate} />
              <RadioGroup label="Whether the Final Settlement has been made to the Legal Heir" required value={finalSettlement} onChange={setFinalSettlement} />
              <RadioGroup label="Birth Certificate" value={birthCertificate} onChange={setBirthCertificate} />
              <RadioGroup label="Any Agreement Obtained from Legal Heir for Recovery of Outstanding" required value={agreementFromLegalHeir} onChange={setAgreementFromLegalHeir} />
            </div>
          </div>

          {/* Outstanding Due */}
          <div className="mb-6 w-80">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
              Any Outstanding due from the Deceased Employee
            </label>
            <div className="flex">
              <IconBox><span className="text-sm font-bold">&#8377;</span></IconBox>
              <input
                type="text"
                value={outstandingDue}
                onChange={(e) => setOutstandingDue(e.target.value)}
                className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm text-right outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </div>
          </div>

          {/* ── Upload Documents Table ── */}
          <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Upload File format: PDF, JPG, PNG and file size should be lessthan 200KB
          </div>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Document</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">File Name</th>
                  <th className="w-32 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, idx) => (
                  <tr
                    key={doc.id}
                    className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}
                  >
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{doc.id}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3">
                      {doc.document} {doc.required && <span className="text-red-500">*</span>}
                    </td>
                    {/* File Name cell */}
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                      {doc.fileName ? (
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href="#"
                            className="max-w-[200px] truncate text-xs text-[#17a2b8] hover:underline"
                            title={doc.fileName}
                            onClick={(e) => e.preventDefault()}
                          >
                            {doc.fileName}
                          </a>
                          <button
                            onClick={() => handleRemoveFile(doc.id)}
                            title="Remove file"
                            className="flex size-4 items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200"
                          >
                            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    {/* Action cell */}
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                      {/* Hidden real file input */}
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        ref={(el) => { fileInputRefs.current[doc.id] = el; }}
                        className="hidden"
                        onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] ?? null)}
                      />
                      <button
                        onClick={() => fileInputRefs.current[doc.id]?.click()}
                        className="mx-auto flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
                      >
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                          <polyline points="17,8 12,3 7,8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        Upload
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
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
            />
            <p className="text-xs text-gray-400">Should be maximum 250 characters</p>
          </div>

          {/* Forward To / Forward For */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></IconBox>
                <input
                  type="text"
                  value={forwardTo}
                  onChange={(e) => setForwardTo(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></IconBox>
                <select
                  value={forwardFor}
                  onChange={(e) => setForwardFor(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Select</option>
                  <option value="Approval">Approval</option>
                  <option value="Final Approval">Final Approval</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit Note
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(`${basePath}/list`)}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Edit Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-1 flex flex-wrap items-center gap-1 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                <select className="rounded border border-stroke bg-transparent px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Sans Serif</option></select>
                <select className="rounded border border-stroke bg-transparent px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Normal</option></select>
                <button className="rounded px-1.5 py-0.5 text-sm font-bold hover:bg-gray-200 dark:hover:bg-dark-3">B</button>
                <button className="rounded px-1.5 py-0.5 text-sm italic hover:bg-gray-200 dark:hover:bg-dark-3">I</button>
                <button className="rounded px-1.5 py-0.5 text-sm underline hover:bg-gray-200 dark:hover:bg-dark-3">U</button>
                <button className="rounded px-1.5 py-0.5 text-sm line-through hover:bg-gray-200 dark:hover:bg-dark-3">S</button>
              </div>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={5}
                placeholder="Enter text ..."
                className="mb-4 w-full rounded-b border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded border border-stroke px-8 py-4 text-center dark:border-dark-3">
                  <p className="mb-2 text-sm font-semibold text-dark dark:text-white">Created By</p>
                  <p className="text-xs text-dark dark:text-white">Name : {noteName}</p>
                  <p className="text-xs text-dark dark:text-white">Designation : {noteDesignation}</p>
                  <p className="text-xs text-dark dark:text-white">Date : {noteDate}</p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
                </button>
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Update Address</h3>
              <button onClick={() => setShowAddressModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Address Line 1 <span className="text-red-500">*</span></label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></IconBox><input type="text" value={addr.line1} onChange={(e) => setAddr({ ...addr, line1: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div></div>
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Address Line 2</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></IconBox><input type="text" value={addr.line2} onChange={(e) => setAddr({ ...addr, line2: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div></div>
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Address Line 3</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></IconBox><input type="text" value={addr.line3} onChange={(e) => setAddr({ ...addr, line3: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div></div>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Local Address Line 1</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></IconBox><input type="text" value={addr.localLine1} onChange={(e) => setAddr({ ...addr, localLine1: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div></div>
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Local Address Line 2</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></IconBox><input type="text" value={addr.localLine2} onChange={(e) => setAddr({ ...addr, localLine2: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div></div>
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Local Address Line 3</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></IconBox><input type="text" value={addr.localLine3} onChange={(e) => setAddr({ ...addr, localLine3: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div></div>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Country <span className="text-red-500">*</span></label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox><select value={addr.country} onChange={(e) => setAddr({ ...addr, country: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="India">India</option></select></div></div>
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">State</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox><select value={addr.state} onChange={(e) => setAddr({ ...addr, state: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="TAMIL NADU">TAMIL NADU</option></select></div></div>
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">District</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox><select value={addr.district} onChange={(e) => setAddr({ ...addr, district: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="VILLUPURAM">VILLUPURAM</option><option value="CHENNAI">CHENNAI</option><option value="CUDDALORE">CUDDALORE</option></select></div></div>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">City</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox><select value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="CUDDALORE">CUDDALORE</option><option value="VILLUPUPRAM">VILLUPUPRAM</option></select></div></div>
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Postal Code <span className="text-red-500">*</span></label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></IconBox><input type="text" value={addr.postalCode} onChange={(e) => setAddr({ ...addr, postalCode: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div></div>
                <div><label className="mb-1 block text-xs font-medium text-dark dark:text-white">Taluk</label><div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox><select value={addr.taluk} onChange={(e) => setAddr({ ...addr, taluk: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option></select></div></div>
              </div>
              <div className="mb-4 w-64">
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Landmark</label>
                <div className="flex"><IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></IconBox><input type="text" value={addr.landmark} onChange={(e) => setAddr({ ...addr, landmark: e.target.value })} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowAddressModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
                </button>
                <button
                  onClick={() => {
                    setAddress(`${addr.line1}, ${addr.line2}, ${addr.localLine1}, ${addr.localLine2}, ${addr.district}, ${addr.country}, ${addr.state}, - ${addr.postalCode}`);
                    setShowAddressModal(false);
                  }}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
