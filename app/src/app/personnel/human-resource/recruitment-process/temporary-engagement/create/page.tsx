"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EngagementRow {
  id: number;
  region: string;
  sanctionedStaffStrength: number;
  totalStaffEligible: number;
  totalStaffOnRole: number;
  excessCount: number;
  shortageCount: number;
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function CreateTemporaryEngagementPage() {
  const router = useRouter();
  const [region, setRegion] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState<string[]>([]);
  const [selectionYear, setSelectionYear] = useState("");
  const [remark, setRemark] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [engagementData, setEngagementData] = useState<EngagementRow[]>([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [showDesignationDropdown, setShowDesignationDropdown] = useState(false);
  const [errors, setErrors] = useState<{ region?: string; department?: string; designation?: string }>({});
  const [showMandatoryFields, setShowMandatoryFields] = useState(true);

  const designationOptions = [
    "MANAGER GRADE I", "MANAGER GRADE II", "SENIOR MANAGER", "ASSISTANT MANAGER",
    "SUPERINTENDENT", "SENIOR CLERK", "JUNIOR CLERK", "PEON", "DRIVER", "WATCHMAN"
  ];

  const handleDesignationToggle = (value: string) => {
    setDesignation((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };

  const handleGenerate = () => {
    const newErrors: typeof errors = {};
    if (!region) newErrors.region = "Region is required";
    if (!department) newErrors.department = "Department is required";
    if (designation.length === 0) newErrors.designation = "Designation is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setEngagementData([
        { id: 1, region: region, sanctionedStaffStrength: 0, totalStaffEligible: 0, totalStaffOnRole: 0, excessCount: 0, shortageCount: 0 },
      ]);
    }
  };

  const handleClear = () => {
    setRegion("");
    setDepartment("");
    setDesignation([]);
    setSelectionYear("");
    setRemark("");
    setEngagementData([]);
    setErrors({});
  };

  const noteName = "SANKARANARAYANAN C";
  const noteDesignation = "SUPERINTENDENT";
  const noteDate = "13-Mar-2026";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Temporary Engagement</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Recruitment Process</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Temporary Engagement</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Temporary Engagement</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white">( <span className="text-red-300">*</span> Mandatory Fields)</span>
            <button onClick={() => setShowMandatoryFields(!showMandatoryFields)} className="text-white hover:opacity-80">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Row 1: Region, Department, Designation */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Region <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></IconBox>
                <select value={region} onChange={(e) => { setRegion(e.target.value); setErrors((prev) => ({ ...prev, region: undefined })); }} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="CHENNAI">CHENNAI</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="SALEM">SALEM</option>
                  <option value="COIMBATORE">COIMBATORE</option>
                  <option value="MADURAI">MADURAI</option>
                </select>
              </div>
              {errors.region && <p className="mt-1 flex items-center gap-1 text-xs text-red-500"><svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2"/><circle cx="12" cy="16" r="1" fill="white"/></svg>{errors.region}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Department <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <select value={department} onChange={(e) => { setDepartment(e.target.value); setErrors((prev) => ({ ...prev, department: undefined })); }} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MARKETING">MARKETING</option>
                  <option value="ACCOUNTS">ACCOUNTS</option>
                  <option value="PRODUCTION">PRODUCTION</option>
                </select>
              </div>
              {errors.department && <p className="mt-1 flex items-center gap-1 text-xs text-red-500"><svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2"/><circle cx="12" cy="16" r="1" fill="white"/></svg>{errors.department}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Designation <span className="text-red-500">*</span></label>
              <div className="relative flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <button type="button" onClick={() => setShowDesignationDropdown(!showDesignationDropdown)} className="flex w-full items-center justify-between rounded-r border border-stroke bg-transparent px-3 py-2 text-left text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <span className={designation.length === 0 ? "text-gray-400" : "text-dark dark:text-white"}>
                    ({designation.length}) Designations Selected
                  </span>
                  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6,9 12,15 18,9"/></svg>
                </button>
                {showDesignationDropdown && (
                  <div className="absolute left-0 top-full z-50 mt-1 max-h-48 w-full overflow-y-auto rounded border border-stroke bg-white shadow-lg dark:border-dark-3 dark:bg-gray-dark">
                    {designationOptions.map((opt) => (
                      <label key={opt} className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-dark-2">
                        <input type="checkbox" checked={designation.includes(opt)} onChange={() => handleDesignationToggle(opt)} className="size-3.5 accent-primary" />
                        <span className="text-dark dark:text-white">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {errors.designation && <p className="mt-1 flex items-center gap-1 text-xs text-red-500"><svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2"/><circle cx="12" cy="16" r="1" fill="white"/></svg>{errors.designation}</p>}
            </div>
          </div>

          {/* Clear / Generate Buttons */}
          <div className="mb-6 flex items-center justify-end gap-3">
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
            <button onClick={handleGenerate} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              Generate
            </button>
          </div>

          {/* Temporary Engagement Table */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Temporary Engagement</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Region</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Sanctioned Staff Strength</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Staff Eligible</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Staff On-Role</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Excess Count</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Shortage Count</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {engagementData.length === 0 ? (
                    <tr><td colSpan={8} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                  ) : (
                    engagementData.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.region}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.sanctionedStaffStrength}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.totalStaffEligible}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.totalStaffOnRole}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.excessCount}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.shortageCount}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                          <button className="rounded bg-[#17a2b8] px-3 py-1 text-xs font-medium text-white hover:opacity-90">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selection Year and Remark */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Selection Year <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox>
                <select value={selectionYear} onChange={(e) => setSelectionYear(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Remark</label>
              <textarea value={remark} onChange={(e) => setRemark(e.target.value)} rows={3} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              <p className="text-xs text-gray-400">Should be maximum 250 characters</p>
            </div>
          </div>

          {/* Forward To / Forward For */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward to <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward for <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></IconBox>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Approval">Approval</option>
                  <option value="Review">Review</option>
                </select>
              </div>
            </div>
          </div>

          {/* Create Note + Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => router.push("/personnel/human-resource/recruitment-process/temporary-engagement/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Toolbar */}
              <div className="mb-1 flex flex-wrap items-center gap-1 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                <select className="rounded border border-stroke bg-transparent px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Sans Serif</option></select>
                <select className="rounded border border-stroke bg-transparent px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Normal</option></select>
                <button className="rounded px-1.5 py-0.5 text-sm font-bold hover:bg-gray-200 dark:hover:bg-dark-3">B</button>
                <button className="rounded px-1.5 py-0.5 text-sm italic hover:bg-gray-200 dark:hover:bg-dark-3">I</button>
                <button className="rounded px-1.5 py-0.5 text-sm underline hover:bg-gray-200 dark:hover:bg-dark-3">U</button>
                <button className="rounded px-1.5 py-0.5 text-sm line-through hover:bg-gray-200 dark:hover:bg-dark-3">S</button>
                <button className="rounded px-1.5 py-0.5 text-sm hover:bg-gray-200 dark:hover:bg-dark-3">A</button>
                <button className="rounded px-1.5 py-0.5 text-xs hover:bg-gray-200 dark:hover:bg-dark-3">x&#8322;</button>
                <button className="rounded px-1.5 py-0.5 text-xs hover:bg-gray-200 dark:hover:bg-dark-3">x&#178;</button>
                <button className="rounded px-1.5 py-0.5 text-xs hover:bg-gray-200 dark:hover:bg-dark-3">H&#8321;</button>
                <button className="rounded px-1.5 py-0.5 text-xs hover:bg-gray-200 dark:hover:bg-dark-3">H&#8322;</button>
                <button className="rounded px-1.5 py-0.5 text-xs hover:bg-gray-200 dark:hover:bg-dark-3">&#8220;&#8221;</button>
                <button className="rounded px-1.5 py-0.5 text-xs hover:bg-gray-200 dark:hover:bg-dark-3">&lt;/&gt;</button>
              </div>
              <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={5} placeholder="Enter text ..." className="mb-4 w-full rounded-b border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />

              {/* Created By info */}
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
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
