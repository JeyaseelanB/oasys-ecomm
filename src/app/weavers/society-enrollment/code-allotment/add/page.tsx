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

const SOCIETY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "muru", label: "muru" },
  { value: "tessfgsg", label: "tessfgsg" },
  { value: "ging", label: "ging" },
  { value: "gingg", label: "gingg" },
  { value: "harshath", label: "harshath" },
  { value: "abc-society", label: "abc society" },
];

interface SocietyData {
  societyNameTamil: string;
  societyRegistrationNumber: string;
  societyRegistrationDate: string;
  societyAddress: string;
  societyProductionStartDate: string;
  societyResolutionDate: string;
  societyResolutionNumber: string;
  adhtOfficeCode: string;
  recommendedBy: string;
  recommendedDate: string;
  societyPresidentName: string;
  presidentAddress: string;
  totalMembers: string;
  demandDraftNumber: string;
  demandDraftDate: string;
  demandDraftAmount: string;
  loomType: string;
  numberOfLooms: string;
  dpOfficeCode: string;
}

const SOCIETY_DETAILS: Record<string, SocietyData> = {
  "muru": {
    societyNameTamil: "uttutuut",
    societyRegistrationNumber: "4466464",
    societyRegistrationDate: "21-Feb-2025",
    societyAddress: "sdfsf, sfsf, sfsfsf, SALEM, SALEM, TAMIL NADU, - 436464",
    societyProductionStartDate: "21-Feb-2025",
    societyResolutionDate: "21-Feb-2025",
    societyResolutionNumber: "4646",
    adhtOfficeCode: "03 / MADURAI",
    recommendedBy: "gthhhh",
    recommendedDate: "21-Feb-2025",
    societyPresidentName: "trttt",
    presidentAddress: "sdfsf, sfsf, sfsfsf, SALEM, SALEM, TAMIL NADU, - 436464",
    totalMembers: "54",
    demandDraftNumber: "24342",
    demandDraftDate: "21-Feb-2025",
    demandDraftAmount: "₹ 3113.00",
    loomType: "HANDLOOM",
    numberOfLooms: "13",
    dpOfficeCode: "D&P Office Madurai",
  },
  "abc-society": {
    societyNameTamil: "abc society",
    societyRegistrationNumber: "1234",
    societyRegistrationDate: "01-Apr-2022",
    societyAddress: "def street, asdf nagar, SALEM, OMALUR, SALEM, TAMIL NADU, - 600012",
    societyProductionStartDate: "01-Jun-2022",
    societyResolutionDate: "01-May-2022",
    societyResolutionNumber: "987",
    adhtOfficeCode: "05 / SALEM",
    recommendedBy: "ADHT",
    recommendedDate: "03-Jun-2022",
    societyPresidentName: "Trial President",
    presidentAddress: "def street, asdf nagar, SALEM, OMALUR, SALEM, TAMIL NADU, - 600012",
    totalMembers: "45",
    demandDraftNumber: "1234",
    demandDraftDate: "01-Jun-2022",
    demandDraftAmount: "₹ 550.00",
    loomType: "HANDLOOM",
    numberOfLooms: "45",
    dpOfficeCode: "D&P Office Salem",
  },
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
  { staffCode: "3693 / MOHANAMBAL T", designation: "e Commerce and Spl Projects", entityCode: "18 / SALEM" },
];

const LOOM_VERIFICATION = [
  {
    memberName: "jklm",
    memberAddress: "plo street, azq nag.......",
    industryAddress: "xyz, India, SALEM, .......",
    numberOfLooms: "1.0",
    rationCard: "",
    aadhaar: "648090875678",
  },
];

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1" />
    <rect x="10" y="2" width="4" height="4" rx="1" />
    <rect x="2" y="10" width="4" height="4" rx="1" />
    <rect x="10" y="10" width="4" height="4" rx="1" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="8,17 12,21 16,17" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
  </svg>
);

const ForwardIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="15,10 20,15 15,20" />
    <path d="M4 4v7a4 4 0 004 4h12" />
  </svg>
);

const valCls = "text-sm font-medium text-[#17a2b8]";
const lblCls = "text-xs text-gray-500 dark:text-gray-400 mb-0.5 block";

export default function CodeAllotmentAddPage() {
  const router = useRouter();
  const [societyName, setSocietyName] = useState("");
  const [societyDetails, setSocietyDetails] = useState<SocietyData | null>(null);
  const [docsOpen, setDocsOpen] = useState(true);
  const [fieldOpen, setFieldOpen] = useState(true);
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("Approve");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");

  const handleSocietyChange = (val: string) => {
    setSocietyName(val);
    setSocietyDetails(val ? (SOCIETY_DETAILS[val] ?? null) : null);
  };

  return (
    <div className="mx-auto space-y-5">
      {/* Page header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Code Allotment</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Society Enrollment</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Code Allotment</li>
          </ol>
        </nav>
      </div>

      {/* Main card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">

        {/* ── Stepper: steps 1-5 done (green ✓), step 6 active (orange) ── */}
        <div className="overflow-x-auto border-b border-stroke px-6 py-5 dark:border-dark-3">
          <div className="flex min-w-max items-start justify-between gap-2">
            {STEPS.map((step, i) => {
              const done   = i < 5;
              const active = i === 5;
              return (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative flex w-full items-center">
                    {i > 0 && (
                      <div className={`h-0.5 flex-1 ${done || active ? "bg-green-400" : "bg-gray-200 dark:bg-dark-3"}`} />
                    )}
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      done   ? "border-green-500 bg-green-500 text-white"
                      : active ? "border-orange-400 bg-white text-orange-400"
                      : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:bg-gray-dark"
                    }`}>
                      {done
                        ? <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20,6 9,17 4,12" /></svg>
                        : i + 1}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`h-0.5 flex-1 ${done ? "bg-green-400" : "bg-gray-200 dark:bg-dark-3"}`} />
                    )}
                  </div>
                  <span className={`mt-1.5 text-center text-[11px] font-medium ${
                    active ? "font-bold text-dark dark:text-white" : done ? "text-gray-500" : "text-gray-400"
                  }`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Society Details ── */}
        <div className="overflow-hidden">
          <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
            <span className="text-sm font-semibold text-white">Society Details</span>
            <button className="text-lg font-bold text-white hover:opacity-70">−</button>
          </div>

          <div className="p-5">
            {/* Society Name dropdown */}
            <div className="mb-5 max-w-xs">
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Society Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <ForwardIcon />
                </span>
                <select
                  className="h-10 flex-1 rounded border border-stroke bg-transparent px-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  value={societyName}
                  onChange={(e) => handleSocietyChange(e.target.value)}
                >
                  {SOCIETY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Auto-populated fields after selection */}
            {societyDetails && (
              <div className="space-y-5">
                {/* Basic info grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
                  <div><p className={lblCls}>Society Name (In Tamil)</p><p className={valCls}>{societyDetails.societyNameTamil}</p></div>
                  <div><p className={lblCls}>Society Registration Number</p><p className={valCls}>{societyDetails.societyRegistrationNumber}</p></div>
                  <div><p className={lblCls}>Society Registration Date</p><p className={valCls}>{societyDetails.societyRegistrationDate}</p></div>
                  <div><p className={lblCls}>Society Address</p><p className={valCls}>{societyDetails.societyAddress}</p></div>
                  <div><p className={lblCls}>Society Production Start Date</p><p className={valCls}>{societyDetails.societyProductionStartDate}</p></div>
                  <div><p className={lblCls}>Society Resolution Date</p><p className={valCls}>{societyDetails.societyResolutionDate}</p></div>
                  <div><p className={lblCls}>Society Resolution Number</p><p className={valCls}>{societyDetails.societyResolutionNumber}</p></div>
                  <div>
                    <p className={lblCls}>Recommendation Letter Received From</p>
                    <button className="mt-1 flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90">
                      <DownloadIcon />
                    </button>
                  </div>
                  <div><p className={lblCls}>ADHT Office Code / Name</p><p className={valCls}>{societyDetails.adhtOfficeCode}</p></div>
                  <div><p className={lblCls}>Recommended by</p><p className={valCls}>{societyDetails.recommendedBy}</p></div>
                  <div><p className={lblCls}>Recommended Date</p><p className={valCls}>{societyDetails.recommendedDate}</p></div>
                </div>

                {/* Society President + DD Details */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                      <GridIcon /> Society President Details
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div><p className={lblCls}>Society President Name</p><p className={valCls}>{societyDetails.societyPresidentName}</p></div>
                      <div><p className={lblCls}>Society Address</p><p className={valCls}>{societyDetails.presidentAddress}</p></div>
                      <div><p className={lblCls}>Total Members in Society</p><p className={valCls}>{societyDetails.totalMembers}</p></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                      <GridIcon /> DD Details
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div><p className={lblCls}>Demand Draft Number</p><p className={valCls}>{societyDetails.demandDraftNumber}</p></div>
                      <div><p className={lblCls}>Demand Draft Date</p><p className={valCls}>{societyDetails.demandDraftDate}</p></div>
                      <div><p className={lblCls}>Demand Draft Amount</p><p className={valCls}>{societyDetails.demandDraftAmount}</p></div>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                    <GridIcon /> Product Details
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div><p className={lblCls}>Loom Type</p><p className={valCls}>{societyDetails.loomType}</p></div>
                    <div><p className={lblCls}>Number of Looms Available</p><p className={valCls}>{societyDetails.numberOfLooms}</p></div>
                    <div><p className={lblCls}>D&amp;P Office Code</p><p className={valCls}>{societyDetails.dpOfficeCode}</p></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sections below only visible once a society is selected */}
        {societyDetails && (
          <>
            {/* ── Attached Supporting Documents ── */}
            <div className="overflow-hidden border-t border-stroke dark:border-dark-3">
              <div
                className="flex cursor-pointer items-center justify-between bg-[#17a2b8] px-5 py-3"
                onClick={() => setDocsOpen((o) => !o)}
              >
                <span className="text-sm font-semibold text-white">Attached Supporting Documents</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 text-white">
                      Total Files <span className="ml-1 rounded-full bg-white px-1.5 font-bold text-[#17a2b8]">12</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-[#28a745] px-2 py-0.5 text-white">
                      Attached <span className="ml-1 rounded-full bg-white px-1.5 font-bold text-[#28a745]">11</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-[#dc3545] px-2 py-0.5 text-white">
                      Remaining <span className="ml-1 rounded-full bg-white px-1.5 font-bold text-[#dc3545]">1</span>
                    </span>
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
                          <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{doc}</td>
                          <td className="border-b border-r border-stroke px-3 py-2 text-xs text-gray-500 dark:border-dark-3">
                            /fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/Helpdesk_Module_Implementation.docx
                          </td>
                          <td className="border-b border-stroke px-3 py-2 text-center dark:border-dark-3">
                            <button className="mx-auto flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90">
                              <DownloadIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ── Field Verification ── */}
            <div className="border-t border-stroke dark:border-dark-3">
              <div
                className="flex cursor-pointer items-center justify-between border-b border-stroke px-5 py-3 dark:border-dark-3"
                onClick={() => setFieldOpen((o) => !o)}
              >
                <span className="text-sm font-semibold text-dark dark:text-white">Field Verification</span>
                <button className="text-lg font-bold text-gray-400 hover:opacity-70">{fieldOpen ? "−" : "+"}</button>
              </div>

              {fieldOpen && (
                <div className="space-y-5 p-5">
                  {/* Committee Members List */}
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                      <GridIcon /> Committee Members List
                    </h4>
                    <p className="mb-1 text-xs text-gray-500">Date of Visit to the Society</p>
                    <p className="mb-3 text-sm font-medium text-[#17a2b8]">06-Jun-2022</p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-[#2d8f7b] text-white">
                            <th className="w-10 border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">#</th>
                            <th className="border border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold">Employee PF Number / Name</th>
                            <th className="border border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold">Designation</th>
                            <th className="border border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold">Entity Code / Name</th>
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

                  {/* Loom Verification List */}
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                      <GridIcon /> Loom Verification List
                    </h4>
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
                              <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{l.memberAddress}</td>
                              <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{l.industryAddress}</td>
                              <td className="border-b border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{l.numberOfLooms}</td>
                              <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{l.rationCard}</td>
                              <td className="border-b border-stroke px-3 py-2 dark:border-dark-3">{l.aadhaar}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Yes / No flags */}
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

                  {/* Forward To / Forward For */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                        Forward To <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-1">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                          <ForwardIcon />
                        </span>
                        <input
                          type="text"
                          value={forwardTo}
                          onChange={(e) => setForwardTo(e.target.value)}
                          className="h-10 w-full rounded border border-stroke bg-transparent px-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                        Forward For <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-1">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                          <ForwardIcon />
                        </span>
                        <select
                          value={forwardFor}
                          onChange={(e) => setForwardFor(e.target.value)}
                          className="h-10 w-full rounded border border-stroke bg-transparent px-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                        >
                          <option value="Approve">Approve</option>
                          <option value="Reject">Reject</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Footer with Create Note + Cancel + Submit ── */}
            <div className="flex items-center justify-between border-t border-stroke px-5 py-4 dark:border-dark-3">
              <button
                onClick={() => setShowNoteModal(true)}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Create Note
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push("/weavers/society-enrollment/code-allotment/list")}
                  className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  Submit
                </button>
              </div>
            </div>
          </>
        )}

        {/* Footer shown before a society is selected */}
        {!societyDetails && (
          <div className="flex justify-end gap-2 border-t border-stroke px-5 py-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/weavers/society-enrollment/code-allotment/list")}
              className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="20,6 9,17 4,12" />
              </svg>
              Submit
            </button>
          </div>
        )}
      </div>

      {/* ── Create Note Modal ── */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            {/* Modal header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-75">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 border-b border-stroke px-4 py-2 text-xs text-gray-400 dark:border-dark-3">
              {["Sans Serif", "Normal", "B", "I", "U", "S"].map((t, i) => (
                <span key={i} className="cursor-pointer rounded px-1.5 py-0.5 hover:bg-gray-100 dark:hover:bg-dark-2">{t}</span>
              ))}
            </div>

            {/* Body */}
            <div className="p-4">
              <textarea
                className="h-32 w-full rounded border border-stroke bg-transparent p-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                placeholder="Enter text ..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <div className="mt-3 w-64 rounded border border-orange-300 p-3 text-xs text-dark dark:text-white">
                <p className="mb-1.5 text-center font-semibold">Created By</p>
                <p>Name : SANKARANARAYANAN</p>
                <p>Designation : SUPERINTENDENT</p>
                <p>Date : 11-Mar-2026</p>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button
                onClick={() => setShowNoteModal(false)}
                className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
              <button
                onClick={() => setShowNoteModal(false)}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}