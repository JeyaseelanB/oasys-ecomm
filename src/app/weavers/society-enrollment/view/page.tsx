"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const STEPS = [
  "Receive Requisition Letter",
  "Supporting Document Collection",
  "Field Verification",
  "Head Office Approval",
  "Board Approval",
  "Society Code Allotment",
];

// Mock data — replace with actual API fetch
const RECORD = {
  societyName: "muru",
  societyNameTamil: "uttutuut",
  societyType: "HANDLOOM",
  societyRegistrationNumber: "4466464",
  societyPresidentName: "trttt",
  societyResolutionDate: "21-Feb-2025",
  societyPresidentAddress: "sdfsf, sfsf, sfsfsf, SALEM, SALEM, TAMIL NADU, - 436464",
  societyAddress: "",
  totalMembersInSociety: "54",
  gstinNumber: "553353535",
  presidentAadhaarNumber: "",
  demandDraftNumber: "24342",
  demandDraftDate: "21-Feb-2025",
  demandDraftAmount: "₹ 3,113.00",
  numberOfLoomsAvailable: "13",
};

const ATTACHMENTS = [
  { id: 1, fileName: "Form No.16 duly filled by the society to admit the society as Co-optex member.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf" },
  { id: 2, fileName: "List of members attested by the deputy director of Handlooms and textiles.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf" },
  { id: 3, fileName: "List of board members of the society.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf" },
  { id: 4, fileName: "Declaration of society.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf" },
  { id: 5, fileName: "By-law of the society duly attested by the Deputy Director of Handlooms and Textiles.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf" },
  { id: 6, fileName: "D.D. for Rs.550/- for share capital.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf" },
  { id: 7, fileName: "Society Resolution to join as member in Co-optex.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf" },
  { id: 8, fileName: "Requisition of the society to admit as member in Co-optex.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf" },
  { id: 9, fileName: "Recommendation letter from concerned Deputy Director of Handlooms and Textiles.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf" },
  { id: 10, fileName: "Certificate of Registration issued by the Deputy Director of Handlooms & Textiles.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf" },
  { id: 11, fileName: "Proceedings issued by the Deputy Director of Handlooms & Textiles, to commence the business of the society.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GI_5915_2023_28_1702360100856.pdf" },
];

const TOTAL_FILES = 12;
const ATTACHED = 11;
const REMAINING = 1;

export default function SocietyEnrollmentViewPage() {
  const router = useRouter();

  const fieldLabel = "mb-0.5 text-xs text-gray-500 dark:text-gray-400";
  const fieldVal = "font-medium text-[#17a2b8]";

  const sectionIcon = (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="4" height="4"/><rect x="10" y="3" width="4" height="4"/><rect x="17" y="3" width="4" height="4"/>
      <rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/>
      <rect x="3" y="17" width="4" height="4"/><rect x="10" y="17" width="4" height="4"/><rect x="17" y="17" width="4" height="4"/>
    </svg>
  );

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Society Enrollment
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Society Enrollment</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Society Enrollment</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Stepper */}
        <div className="overflow-x-auto border-b border-stroke px-6 py-5 dark:border-dark-3">
          <div className="flex min-w-max items-start justify-between gap-2">
            {STEPS.map((step, i) => {
              const completed = i === 0;
              const active = i === 1;
              return (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative flex w-full items-center">
                    {i > 0 && (
                      <div className={`h-0.5 flex-1 ${i <= 1 ? "bg-[#17a2b8]" : "bg-gray-200 dark:bg-dark-3"}`} />
                    )}
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                        completed
                          ? "border-[#28a745] bg-[#28a745] text-white"
                          : active
                          ? "border-orange-400 bg-white text-orange-400"
                          : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:bg-gray-dark"
                      }`}
                    >
                      {completed ? (
                        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12"/></svg>
                      ) : (i + 1)}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="h-0.5 flex-1 bg-gray-200 dark:bg-dark-3" />
                    )}
                  </div>
                  <span className={`mt-1.5 text-center text-[11px] font-medium ${active ? "font-bold text-dark dark:text-white" : completed ? "text-[#28a745]" : "text-gray-400"}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">View Society Enrollment</span>
        </div>

        {/* View Body */}
        <div className="p-5">

          {/* Row 1 */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
            <div>
              <p className={fieldLabel}>Society Name</p>
              <p className={fieldVal}>{RECORD.societyName}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society Name (In Tamil)</p>
              <p className={fieldVal}>{RECORD.societyNameTamil}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society Type</p>
              <p className={fieldVal}>{RECORD.societyType}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society Registration Number</p>
              <p className={fieldVal}>{RECORD.societyRegistrationNumber}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
            <div>
              <p className={fieldLabel}>Society President Name</p>
              <p className={fieldVal}>{RECORD.societyPresidentName}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society Resolution Date</p>
              <p className={fieldVal}>{RECORD.societyResolutionDate}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society President Address</p>
              <p className={fieldVal}>{RECORD.societyPresidentAddress}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society Address</p>
              <p className={fieldVal}>{RECORD.societyAddress || "—"}</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
            <div>
              <p className={fieldLabel}>Total Members in Society</p>
              <p className={fieldVal}>{RECORD.totalMembersInSociety}</p>
            </div>
            <div>
              <p className={fieldLabel}>GSTIN Number</p>
              <p className={fieldVal}>{RECORD.gstinNumber}</p>
            </div>
            <div>
              <p className={fieldLabel}>President Aadhaar Number</p>
              <p className={fieldVal}>{RECORD.presidentAadhaarNumber || "—"}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-5 border-t border-stroke dark:border-dark-3" />

          {/* DD Details */}
          <div className="mb-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              {sectionIcon}
              DD Details
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-3">
              <div>
                <p className={fieldLabel}>Demand Draft Number</p>
                <p className={fieldVal}>{RECORD.demandDraftNumber}</p>
              </div>
              <div>
                <p className={fieldLabel}>Demand Draft Date</p>
                <p className={fieldVal}>{RECORD.demandDraftDate}</p>
              </div>
              <div>
                <p className={fieldLabel}>Demand Draft Amount</p>
                <p className={fieldVal}>{RECORD.demandDraftAmount}</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-5 border-t border-stroke dark:border-dark-3" />

          {/* Product Details */}
          <div className="mb-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              {sectionIcon}
              Product Details
            </h4>
            <div>
              <p className={fieldLabel}>Number of Looms Available</p>
              <p className={fieldVal}>{RECORD.numberOfLoomsAvailable}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-5 border-t border-stroke dark:border-dark-3" />

          {/* Attachments */}
          <div className="mb-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                {sectionIcon}
                Attachments
              </h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 rounded border border-stroke px-2.5 py-1 dark:border-dark-3">
                  Total Files <span className="flex size-5 items-center justify-center rounded-full bg-[#17a2b8] text-[10px] font-bold text-white">{TOTAL_FILES}</span>
                </span>
                <span className="flex items-center gap-1 rounded border border-stroke px-2.5 py-1 dark:border-dark-3">
                  Attached <span className="flex size-5 items-center justify-center rounded-full bg-[#28a745] text-[10px] font-bold text-white">{ATTACHED}</span>
                </span>
                <span className="flex items-center gap-1 rounded border border-stroke px-2.5 py-1 dark:border-dark-3">
                  Remaining <span className="flex size-5 items-center justify-center rounded-full bg-[#dc3545] text-[10px] font-bold text-white">{REMAINING}</span>
                </span>
              </div>
            </div>
            <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#17a2b8]">
                    <th className="w-12 px-4 py-2.5 text-center text-xs font-semibold text-white">#</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-white">File Name</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-white">File Path</th>
                    <th className="w-20 px-4 py-2.5 text-center text-xs font-semibold text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ATTACHMENTS.map((att) => (
                    <tr key={att.id} className="border-t border-stroke dark:border-dark-3">
                      <td className="px-4 py-2.5 text-center text-gray-500">{att.id}</td>
                      <td className="px-4 py-2.5 text-dark dark:text-white">{att.fileName}</td>
                      <td className="px-4 py-2.5 text-xs text-gray-500 dark:text-gray-400 break-all">{att.filePath}</td>
                      <td className="px-4 py-2.5 text-center">
                        <a
                          href={att.filePath}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex size-8 items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90"
                          title="Download"
                        >
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/>
                            <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/>
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/weavers/society-enrollment/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
