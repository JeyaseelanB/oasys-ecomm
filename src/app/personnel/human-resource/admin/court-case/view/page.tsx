"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface HearingEntry {
  id: number;
  stagesOfHearing: string;
  lastHearingDate: string;
  nextHearingDate: string;
}

interface UploadedDoc {
  id: number;
  name: string;
  type: string;
  fileSizeKB: number;
}

const MOCK_PETITIONERS = [
  { id: 1, name: "M. KRISHNAN" },
  { id: 2, name: "S. KUMAR" },
];

const MOCK_RESPONDENTS = [
  { id: 1, name: "CO-OPTEX" },
];

const MOCK_HEARINGS: HearingEntry[] = [
  { id: 1, stagesOfHearing: "Filing", lastHearingDate: "10-Jan-2023", nextHearingDate: "15-Feb-2023" },
  { id: 2, stagesOfHearing: "Hearing", lastHearingDate: "15-Feb-2023", nextHearingDate: "20-Mar-2023" },
  { id: 3, stagesOfHearing: "Arguments", lastHearingDate: "20-Mar-2023", nextHearingDate: "25-Apr-2023" },
];

const MOCK_DOCS: UploadedDoc[] = [
  { id: 1, name: "Court_Notice.pdf", type: "pdf", fileSizeKB: 245 },
  { id: 2, name: "Counter_Affidavit.docx", type: "docx", fileSizeKB: 128 },
];

export default function ViewCourtCasePage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Court Cases</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Court Cases</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Court Cases</h3>
        </div>

        <div className="p-5">
          {/* Row 1: HO/RO, Type of Case, Court, Case No. */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#17a2b8]">HEAD OFFICE</p></div>
            <div><p className="text-xs text-gray-500">Type of Case</p><p className="text-sm font-medium text-[#17a2b8]">Civil Case</p></div>
            <div><p className="text-xs text-gray-500">Court</p><p className="text-sm font-medium text-[#17a2b8]">HIGH COURT OF MADRAS</p></div>
            <div><p className="text-xs text-gray-500">Case No.</p><p className="text-sm font-medium text-[#17a2b8]">WP/2023/001</p></div>
          </div>

          {/* Row 2: Complaint Registered, Subject */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Complaint Registered</p><p className="text-sm font-medium text-dark dark:text-white">Yes</p></div>
            <div className="lg:col-span-3"><p className="text-xs text-gray-500">Subject</p><p className="text-sm font-medium text-[#17a2b8]">Writ Petition regarding service matter - Transfer order challenged</p></div>
          </div>

          {/* Petitioner Name Table */}
          <div className="mb-4">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Petitioner Name</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Petitioner Name</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PETITIONERS.map((p, idx) => (
                    <tr key={p.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3">{p.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Respondent Name Table */}
          <div className="mb-4">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Respondent Name</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Respondent Name</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_RESPONDENTS.map((r, idx) => (
                    <tr key={r.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3">{r.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Row 3: Counter Affidavit, Vakalath Filed, Date of Filing Counter, Stage of Case */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Counter Affidavit</p><p className="text-sm font-medium text-dark dark:text-white">Yes</p></div>
            <div><p className="text-xs text-gray-500">Vakalath Filed</p><p className="text-sm font-medium text-dark dark:text-white">Yes</p></div>
            <div><p className="text-xs text-gray-500">Date of Filing Counter</p><p className="text-sm font-medium text-[#17a2b8]">15-Jan-2023</p></div>
            <div><p className="text-xs text-gray-500">Stage of Case</p><p className="text-sm font-medium text-[#17a2b8]">Arguments</p></div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Hearing Date Table */}
          <div className="mt-5 mb-4">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Hearing Date</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Stages of Hearing</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Last Hearing Date</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Next Hearing Date</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_HEARINGS.map((h, idx) => (
                    <tr key={h.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3">{h.stagesOfHearing}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{h.lastHearingDate}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{h.nextHearingDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Uploaded Documents */}
          <div className="mt-5 mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Uploaded Documents</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Type</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">File Size( in KB)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_DOCS.map((doc, idx) => (
                    <tr key={doc.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3">{doc.name}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{doc.type}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{doc.fileSizeKB}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <button className="rounded bg-[#17a2b8] px-3 py-1 text-xs font-medium text-white hover:opacity-90">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/human-resource/admin/court-case/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
