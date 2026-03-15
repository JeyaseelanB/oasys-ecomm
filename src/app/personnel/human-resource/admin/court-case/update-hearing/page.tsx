"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

const MOCK_DOCS: UploadedDoc[] = [
  { id: 1, name: "Court_Notice.pdf", type: "pdf", fileSizeKB: 245 },
];

export default function UpdateHearingPage() {
  const router = useRouter();
  const [hearings, setHearings] = useState<HearingEntry[]>([
    { id: 1, stagesOfHearing: "Filing", lastHearingDate: "10-Jan-2023", nextHearingDate: "15-Feb-2023" },
    { id: 2, stagesOfHearing: "Hearing", lastHearingDate: "15-Feb-2023", nextHearingDate: "20-Mar-2023" },
  ]);
  const [newStage, setNewStage] = useState("");
  const [newLastDate, setNewLastDate] = useState("");
  const [newNextDate, setNewNextDate] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const addHearing = () => {
    if (newStage && newLastDate && newNextDate) {
      const formatDate = (d: string) => { const dt = new Date(d); return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }); };
      setHearings((prev) => [...prev, { id: Date.now(), stagesOfHearing: newStage, lastHearingDate: formatDate(newLastDate), nextHearingDate: formatDate(newNextDate) }]);
      setNewStage("");
      setNewLastDate("");
      setNewNextDate("");
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Update Hearing Court Case</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Update Hearing Court Case</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Court Cases</h3>
        </div>

        <div className="p-5">
          {/* Read-only Court Case Details */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#17a2b8]">HEAD OFFICE</p></div>
            <div><p className="text-xs text-gray-500">Type of Case</p><p className="text-sm font-medium text-[#17a2b8]">Civil Case</p></div>
            <div><p className="text-xs text-gray-500">Court</p><p className="text-sm font-medium text-[#17a2b8]">HIGH COURT OF MADRAS</p></div>
            <div><p className="text-xs text-gray-500">Case No.</p><p className="text-sm font-medium text-[#17a2b8]">WP/2023/001</p></div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Complaint Registered</p><p className="text-sm font-medium text-dark dark:text-white">Yes</p></div>
            <div className="lg:col-span-3"><p className="text-xs text-gray-500">Subject</p><p className="text-sm font-medium text-[#17a2b8]">Writ Petition regarding service matter - Transfer order challenged</p></div>
          </div>

          {/* Petitioner & Respondent read-only */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">Petitioner Name</p>
              <p className="text-sm font-medium text-[#17a2b8]">M. KRISHNAN, S. KUMAR</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Respondent Name</p>
              <p className="text-sm font-medium text-[#17a2b8]">CO-OPTEX</p>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Counter Affidavit</p><p className="text-sm font-medium text-dark dark:text-white">Yes</p></div>
            <div><p className="text-xs text-gray-500">Vakalath Filed</p><p className="text-sm font-medium text-dark dark:text-white">Yes</p></div>
            <div><p className="text-xs text-gray-500">Date of Filing Counter</p><p className="text-sm font-medium text-[#17a2b8]">15-Jan-2023</p></div>
            <div><p className="text-xs text-gray-500">Stage of Case</p><p className="text-sm font-medium text-[#17a2b8]">Arguments</p></div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Hearing Date Section */}
          <div className="mt-5 mb-4">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Hearing Date</h4>
            </div>

            {/* Existing Hearings Table */}
            <div className="mb-4 overflow-x-auto">
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
                  {hearings.length === 0 ? (
                    <tr><td colSpan={4} className="border border-stroke py-4 px-3 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                  ) : (
                    hearings.map((h, idx) => (
                      <tr key={h.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 dark:border-dark-3">{h.stagesOfHearing}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{h.lastHearingDate}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{h.nextHearingDate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Add New Hearing Entry */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Stages of Hearing</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox>
                  <select value={newStage} onChange={(e) => setNewStage(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="Filing">Filing</option>
                    <option value="Hearing">Hearing</option>
                    <option value="Arguments">Arguments</option>
                    <option value="Judgement">Judgement</option>
                    <option value="Disposal">Disposal</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Last Hearing Date <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox>
                  <input type="date" value={newLastDate} onChange={(e) => setNewLastDate(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Next Hearing Date <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox>
                  <input type="date" value={newNextDate} onChange={(e) => setNewNextDate(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <button onClick={addHearing} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Hearing
              </button>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Upload Documents */}
          <div className="mt-5 mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Uploaded Documents</h4>
            </div>
            <div className="mb-3 flex items-center gap-3">
              <input type="file" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} className="w-72 rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Upload
              </button>
            </div>
            <p className="mb-3 text-xs text-gray-400">File format:pdf,doc,xlsx. File size should be less than 5 MB</p>
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

          {/* Bottom Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/human-resource/admin/court-case/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
