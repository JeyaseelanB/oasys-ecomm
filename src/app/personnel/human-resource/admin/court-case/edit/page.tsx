"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NameEntry {
  id: number;
  name: string;
}

interface DocEntry {
  id: number;
  name: string;
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function EditCourtCasePage() {
  const router = useRouter();
  const [hoRo, setHoRo] = useState("HEAD OFFICE");
  const [typeOfCase, setTypeOfCase] = useState("Civil Case");
  const [court, setCourt] = useState("HIGH COURT OF MADRAS");
  const [caseNo, setCaseNo] = useState("WP/2023/001");
  const [complaintRegistered, setComplaintRegistered] = useState("Yes");
  const [subject, setSubject] = useState("Writ Petition regarding service matter - Transfer order challenged");
  const [petitionerInput, setPetitionerInput] = useState("");
  const [petitioners, setPetitioners] = useState<NameEntry[]>([
    { id: 1, name: "M. KRISHNAN" },
    { id: 2, name: "S. KUMAR" },
  ]);
  const [respondentInput, setRespondentInput] = useState("");
  const [respondents, setRespondents] = useState<NameEntry[]>([
    { id: 1, name: "CO-OPTEX" },
  ]);
  const [counterAffidavit, setCounterAffidavit] = useState("Yes");
  const [vakalathFiled, setVakalathFiled] = useState("Yes");
  const [dateOfFilingCounter, setDateOfFilingCounter] = useState("2023-01-15");
  const [stageOfCase, setStageOfCase] = useState("Arguments");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<DocEntry[]>([]);

  const addPetitioner = () => {
    if (petitionerInput.trim()) {
      setPetitioners((prev) => [...prev, { id: Date.now(), name: petitionerInput.trim() }]);
      setPetitionerInput("");
    }
  };

  const addRespondent = () => {
    if (respondentInput.trim()) {
      setRespondents((prev) => [...prev, { id: Date.now(), name: respondentInput.trim() }]);
      setRespondentInput("");
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Court Cases</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit Court Cases</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Court Cases</h3>
          <span className="text-xs text-white">( <span className="text-red-300">*</span> Mandatory Fields) &#8212;</span>
        </div>

        <div className="p-5">
          {/* Row 1: HO/RO, Type of Case, Court, Case No. */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">HO/RO <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <select value={hoRo} onChange={(e) => setHoRo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="CHENNAI">CHENNAI</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Type of Case <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox>
                <select value={typeOfCase} onChange={(e) => setTypeOfCase(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Civil Case">Civil Case</option>
                  <option value="Criminal Case">Criminal Case</option>
                  <option value="Labour Case">Labour Case</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Court <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <select value={court} onChange={(e) => setCourt(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="HIGH COURT OF MADRAS">HIGH COURT OF MADRAS</option>
                  <option value="DISTRICT COURT">DISTRICT COURT</option>
                  <option value="SUPREME COURT">SUPREME COURT</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Case No.</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={caseNo} onChange={(e) => setCaseNo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          {/* Complaint Registered */}
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Complaint Registered <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-dark dark:text-white">
                <input type="radio" name="complaintRegistered" value="Yes" checked={complaintRegistered === "Yes"} onChange={(e) => setComplaintRegistered(e.target.value)} className="accent-primary" /> Yes
              </label>
              <label className="flex items-center gap-2 text-sm text-dark dark:text-white">
                <input type="radio" name="complaintRegistered" value="No" checked={complaintRegistered === "No"} onChange={(e) => setComplaintRegistered(e.target.value)} className="accent-primary" /> No
              </label>
            </div>
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Subject</label>
            <textarea value={subject} onChange={(e) => setSubject(e.target.value)} rows={2} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
          </div>

          {/* Petitioner Name Section */}
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Petitioner Name</label>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex flex-1">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <input type="text" value={petitionerInput} onChange={(e) => setPetitionerInput(e.target.value)} placeholder="Enter Petitioner Name" className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
              <button onClick={addPetitioner} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Petitioner Name</th>
                    <th className="w-20 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {petitioners.length === 0 ? (
                    <tr><td colSpan={3} className="border border-stroke py-4 px-3 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                  ) : (
                    petitioners.map((p, idx) => (
                      <tr key={p.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 dark:border-dark-3">{p.name}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                          <button onClick={() => setPetitioners((prev) => prev.filter((x) => x.id !== p.id))} className="text-[#dc3545] hover:opacity-70">
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Respondent Name Section */}
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Respondent Name</label>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex flex-1">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <input type="text" value={respondentInput} onChange={(e) => setRespondentInput(e.target.value)} placeholder="Enter Respondent Name" className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
              <button onClick={addRespondent} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Respondent Name</th>
                    <th className="w-20 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {respondents.length === 0 ? (
                    <tr><td colSpan={3} className="border border-stroke py-4 px-3 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                  ) : (
                    respondents.map((r, idx) => (
                      <tr key={r.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 dark:border-dark-3">{r.name}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                          <button onClick={() => setRespondents((prev) => prev.filter((x) => x.id !== r.id))} className="text-[#dc3545] hover:opacity-70">
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Counter Affidavit, Vakalath Filed, Date of Filing Counter, Stage of Case */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Counter Affidavit <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white">
                  <input type="radio" name="counterAffidavit" value="Yes" checked={counterAffidavit === "Yes"} onChange={(e) => setCounterAffidavit(e.target.value)} className="accent-primary" /> Yes
                </label>
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white">
                  <input type="radio" name="counterAffidavit" value="No" checked={counterAffidavit === "No"} onChange={(e) => setCounterAffidavit(e.target.value)} className="accent-primary" /> No
                </label>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Vakalath Filed <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white">
                  <input type="radio" name="vakalathFiled" value="Yes" checked={vakalathFiled === "Yes"} onChange={(e) => setVakalathFiled(e.target.value)} className="accent-primary" /> Yes
                </label>
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white">
                  <input type="radio" name="vakalathFiled" value="No" checked={vakalathFiled === "No"} onChange={(e) => setVakalathFiled(e.target.value)} className="accent-primary" /> No
                </label>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Filing Counter <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox>
                <input type="date" value={dateOfFilingCounter} onChange={(e) => setDateOfFilingCounter(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Stage of Case <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox>
                <select value={stageOfCase} onChange={(e) => setStageOfCase(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Filing">Filing</option>
                  <option value="Hearing">Hearing</option>
                  <option value="Arguments">Arguments</option>
                  <option value="Judgement">Judgement</option>
                </select>
              </div>
            </div>
          </div>

          {/* Upload Documents */}
          <div className="mb-6">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Upload Documents</label>
            <div className="flex items-center gap-3">
              <input type="file" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} className="w-72 rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Upload
              </button>
            </div>
            <p className="mt-1 mb-3 text-xs text-[#17a2b8]">File format: png, jpeg, pdf, doc and file size should be less than 2MB</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Document Name</th>
                    <th className="w-24 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedDocs.length === 0 ? (
                    <tr><td colSpan={3} className="border border-stroke py-4 px-3 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                  ) : (
                    uploadedDocs.map((doc, idx) => (
                      <tr key={doc.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 dark:border-dark-3">{doc.name}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                          <button onClick={() => setUploadedDocs((prev) => prev.filter((x) => x.id !== doc.id))} className="text-[#dc3545] hover:opacity-70">
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
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
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
