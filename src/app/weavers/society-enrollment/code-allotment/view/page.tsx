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
  societyName: "muru",
  societyNameTamil: "uttutuut",
  societyRegistrationNumber: "4466464",
  societyRegistrationDate: "21-Feb-2025",
  societyProductionStartDate: "21-Feb-2025",
  societyResolutionDate: "21-Feb-2025",
  societyAddress: "sdfsf, sfsf, sfsfsf, SALEM, SALEM, TAMIL NADU, - 436464",
  societyResolutionNumber: "4646",
  adhtOfficeCode: "03 / MADURAI",
  recommendedBy: "gthhhh",
  recommendedDate: "21-Feb-2025",
  societyCode: "030007",
  societyPresidentName: "trttt",
  presidentAddress: "sdfsf, sfsf, sfsfsf, SALEM, SALEM, TAMIL NADU, - 436464",
  totalMembers: "54",
  demandDraftNumber: "24342",
  demandDraftDate: "21-Feb-2025",
  demandDraftAmount: "₹ 3113.00",
  loomType: "HANDLOOM",
  numberOfLooms: "13",
  dpOfficeCode: "D&P Office Madurai",
  dateOfVisit: "21-Feb-2025",
  isRegistered: "No",
  isRecommended: "Yes",
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
  { staffCode: "/ SAMINATHAN", designation: "ASSISTANT SALES MAN", entityCode: "10 / HEAD OFFICE" },
];

const LOOM_VERIFICATION = [
  { memberName: "54353", memberAddress: "53sdfsf, sfsf, sfsf.......", industryAddress: "35355, 35355, 35355.......", numberOfLooms: "35.0", rationCard: "", aadhaar: "53553533553" },
];

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1"/><rect x="10" y="2" width="4" height="4" rx="1"/>
    <rect x="2" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/>
  </svg>
);

const valCls = "text-sm font-medium text-[#17a2b8]";
const lblCls = "text-xs text-gray-500 dark:text-gray-400 mb-0.5 block";

export default function CodeAllotmentViewPage() {
  const router = useRouter();
  const [societyOpen, setSocietyOpen] = useState(true);
  const [docsOpen, setDocsOpen] = useState(true);
  const [fieldOpen, setFieldOpen] = useState(true);

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Code Allotment</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Society Enrollment</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Code Allotment</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">

        {/* Stepper */}
        <div className="overflow-x-auto border-b border-stroke px-6 py-5 dark:border-dark-3">
          <div className="flex min-w-max items-start justify-between gap-2">
            {STEPS.map((step, i) => {
              const done = i < 5;
              const active = i === 5;
              return (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative flex w-full items-center">
                    {i > 0 && <div className={`h-0.5 flex-1 ${done || active ? "bg-green-400" : "bg-gray-200"}`} />}
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      done ? "border-green-500 bg-green-500 text-white"
                      : active ? "border-orange-400 bg-white text-orange-400"
                      : "border-gray-300 bg-white text-gray-400"
                    }`}>
                      {done ? <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20,6 9,17 4,12"/></svg> : i + 1}
                    </div>
                    {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 ${done ? "bg-green-400" : "bg-gray-200"}`} />}
                  </div>
                  <span className={`mt-1.5 text-center text-[11px] font-medium ${active ? "font-bold text-dark dark:text-white" : done ? "text-gray-500" : "text-gray-400"}`}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Society Details */}
        <div>
          <div className="flex cursor-pointer items-center justify-between bg-[#17a2b8] px-5 py-3" onClick={() => setSocietyOpen((o) => !o)}>
            <span className="text-sm font-semibold text-white">Society Details</span>
            <button className="text-lg font-bold text-white hover:opacity-70">{societyOpen ? "−" : "+"}</button>
          </div>
          {societyOpen && (
            <div className="p-5 space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-4">
                <div><p className={lblCls}>Society Type</p><p className={valCls}>{RECORD.societyType}</p></div>
                <div><p className={lblCls}>Society Name</p><p className={valCls}>{RECORD.societyName}</p></div>
                <div><p className={lblCls}>Society Name (In Tamil)</p><p className={valCls}>{RECORD.societyNameTamil}</p></div>
                <div><p className={lblCls}>Society Registration Number</p><p className={valCls}>{RECORD.societyRegistrationNumber}</p></div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-4">
                <div><p className={lblCls}>Society Registration Date</p><p className={valCls}>{RECORD.societyRegistrationDate}</p></div>
                <div><p className={lblCls}>Society Production Start Date</p><p className={valCls}>{RECORD.societyProductionStartDate}</p></div>
                <div><p className={lblCls}>Society Resolution Date</p><p className={valCls}>{RECORD.societyResolutionDate}</p></div>
                <div><p className={lblCls}>Society Address</p><p className={valCls}>{RECORD.societyAddress}</p></div>
              </div>
              {/* Row 3 */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-4">
                <div><p className={lblCls}>Society Resolution Number</p><p className={valCls}>{RECORD.societyResolutionNumber}</p></div>
                <div>
                  <p className={lblCls}>Recommendation Letter Received From</p>
                  <button className="mt-1 flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/></svg>
                  </button>
                </div>
                <div><p className={lblCls}>ADHT Office Code / Name</p><p className={valCls}>{RECORD.adhtOfficeCode}</p></div>
                <div><p className={lblCls}>Recommended by</p><p className={valCls}>{RECORD.recommendedBy}</p></div>
              </div>
              {/* Row 4 */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-4">
                <div><p className={lblCls}>Recommended Date</p><p className={valCls}>{RECORD.recommendedDate}</p></div>
                <div><p className={lblCls}>Society Code</p><p className={valCls}>{RECORD.societyCode}</p></div>
              </div>

              {/* Society President + DD Details */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 pt-2">
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
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white"><GridIcon /> Product Details</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div><p className={lblCls}>Loom Type</p><p className={valCls}>{RECORD.loomType}</p></div>
                  <div><p className={lblCls}>Number of Looms Available</p><p className={valCls}>{RECORD.numberOfLooms}</p></div>
                  <div><p className={lblCls}>D&P Office Code</p><p className={valCls}>{RECORD.dpOfficeCode}</p></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Attached Supporting Documents */}
        <div className="border-t border-stroke dark:border-dark-3">
          <div className="flex cursor-pointer items-center justify-between bg-[#17a2b8] px-5 py-3" onClick={() => setDocsOpen((o) => !o)}>
            <span className="text-sm font-semibold text-white">Attached Supporting Documents</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-sm bg-white/20 px-2 py-0.5 text-white">
                  Total Files <span className="rounded-full bg-[#17a2b8] border border-white px-1.5 font-bold">12</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-sm bg-[#28a745] px-2 py-0.5 text-white">
                  Attached <span className="rounded-full bg-white px-1.5 font-bold text-[#28a745]">11</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-sm bg-[#dc3545] px-2 py-0.5 text-white">
                  Remaining <span className="rounded-full bg-white px-1.5 font-bold text-[#dc3545]">1</span>
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
                      <td className="border-b border-r border-stroke px-3 py-2 text-xs text-gray-500 dark:border-dark-3">/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf</td>
                      <td className="border-b border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <button className="flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90 mx-auto">
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
            <div className="p-5 space-y-5">
              {/* Committee Members */}
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white"><GridIcon /> Committee Members List</h4>
                <p className="mb-1 text-xs text-gray-500">Date of Visit to the Society</p>
                <p className="mb-3 text-sm font-medium text-[#17a2b8]">{RECORD.dateOfVisit}</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#2d8f7b] text-white">
                        <th className="w-10 border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">#</th>
                        <th className="border border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold">Staff Code / Name</th>
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

              {/* Flags */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Is the society is properly registered under ADHT office</p>
                  <p className="text-sm font-medium text-[#17a2b8]">{RECORD.isRegistered}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Is the committee recommended to allot the society code</p>
                  <p className="text-sm font-medium text-[#17a2b8]">{RECORD.isRecommended}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button
            onClick={() => router.push("/weavers/society-enrollment/code-allotment/list")}
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
