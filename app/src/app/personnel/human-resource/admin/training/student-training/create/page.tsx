"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </div>
);

const GridIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </svg>
);

export default function CreateStudentTrainingPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);

  // Form fields
  const [institutionType, setInstitutionType] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("05:00 PM");
  const [purpose, setPurpose] = useState("");
  const [topic, setTopic] = useState("");
  // Institution details
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [noOfStudents, setNoOfStudents] = useState("");
  const [department, setDepartment] = useState("");
  // Note modal
  const [noteContent, setNoteContent] = useState("");
  const [noteFontSize, setNoteFontSize] = useState("14px");
  const [noteFontFamily, setNoteFontFamily] = useState("Arial");

  function spinTime(setter: (v: string) => void, value: string, dir: 1 | -1) {
    const [timePart, meridiem] = value.split(" ");
    let [h, m] = timePart.split(":").map(Number);
    m += dir * 30;
    if (m >= 60) { m = 0; h += 1; }
    if (m < 0) { m = 30; h -= 1; }
    if (h > 12) h = 1;
    if (h < 1) h = 12;
    setter(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${meridiem}`);
  }

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Student Training Request</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Training</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Student Training Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Student Training Request</h3>
        </div>

        <div className="p-5">
          {/* Section 1: Training Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Training Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-3 dark:border-dark-3">
            {/* Institution Type */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Institution Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </IconBox>
                <select
                  value={institutionType}
                  onChange={(e) => setInstitutionType(e.target.value)}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">-- Select --</option>
                  <option value="university">University</option>
                  <option value="college">College</option>
                  <option value="institute">Institute</option>
                  <option value="polytechnic">Polytechnic</option>
                </select>
              </div>
            </div>

            {/* Institution Name */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Institution Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  </svg>
                </IconBox>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="Enter institution name"
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>

            {/* Scheduled Start Date */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Scheduled Start Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </IconBox>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>

            {/* Scheduled End Date */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Scheduled End Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </IconBox>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>

            {/* No. of Days */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">No. of Days</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                  </svg>
                </IconBox>
                <input
                  type="number"
                  value={noOfDays}
                  onChange={(e) => setNoOfDays(e.target.value)}
                  placeholder="0"
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>

            {/* Scheduled Start Time */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Scheduled Start Time</label>
              <div className="flex items-center gap-2">
                <div className="flex flex-1">
                  <IconBox>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </IconBox>
                  <input
                    type="text"
                    value={startTime}
                    readOnly
                    className="flex-1 rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm dark:border-dark-3 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <button onClick={() => spinTime(setStartTime, startTime, 1)} className="rounded border border-stroke px-2 py-0.5 text-xs hover:bg-gray-100 dark:border-dark-3">▲</button>
                  <button onClick={() => spinTime(setStartTime, startTime, -1)} className="rounded border border-stroke px-2 py-0.5 text-xs hover:bg-gray-100 dark:border-dark-3">▼</button>
                </div>
              </div>
            </div>

            {/* Scheduled End Time */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Scheduled End Time</label>
              <div className="flex items-center gap-2">
                <div className="flex flex-1">
                  <IconBox>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </IconBox>
                  <input
                    type="text"
                    value={endTime}
                    readOnly
                    className="flex-1 rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm dark:border-dark-3 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <button onClick={() => spinTime(setEndTime, endTime, 1)} className="rounded border border-stroke px-2 py-0.5 text-xs hover:bg-gray-100 dark:border-dark-3">▲</button>
                  <button onClick={() => spinTime(setEndTime, endTime, -1)} className="rounded border border-stroke px-2 py-0.5 text-xs hover:bg-gray-100 dark:border-dark-3">▼</button>
                </div>
              </div>
            </div>

            {/* Purpose of Training */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Purpose of Training <span className="text-red-500">*</span></label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
                placeholder="Enter purpose of training..."
                className="w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </div>

            {/* Topic */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Topic</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={2}
                placeholder="Enter topic..."
                className="w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </div>
          </div>

          {/* Section 2: Institution Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Institution Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-3 dark:border-dark-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Contact Person</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </IconBox>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Enter contact person"
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Contact Number</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.35 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.26 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.34a16 16 0 006.75 6.75l.71-.71a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </IconBox>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Enter contact number"
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Email</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </IconBox>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">No. of Students</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </IconBox>
                <input
                  type="number"
                  value={noOfStudents}
                  onChange={(e) => setNoOfStudents(e.target.value)}
                  placeholder="0"
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Department</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </IconBox>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Enter department"
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="Enter address..."
                className="w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </div>
          </div>

          {/* Section 3: Requested Document Upload */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Requested Document Upload</h4>
          </div>
          <div className="mb-6 border-b border-stroke pb-6 dark:border-dark-3">
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Upload Documents</label>
            <input
              type="file"
              multiple
              className="block w-full text-sm text-gray-500 file:mr-3 file:rounded file:border-0 file:bg-[#2d8f7b] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:opacity-90"
            />
            <p className="mt-1 text-xs text-gray-400">Supported formats: PDF, DOC, DOCX, JPG, PNG</p>
          </div>

          {/* Section 4: Forward To/For */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Forward To / For</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 dark:border-dark-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Forward To</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </IconBox>
                <select className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">-- Select Employee --</option>
                  <option value="1">ALOK / BABELAY</option>
                  <option value="2">VAASU / R</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Forward For</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </IconBox>
                <select className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">-- Select Action --</option>
                  <option value="approval">Approval</option>
                  <option value="review">Review</option>
                  <option value="info">For Information</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              + Create Note
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/personnel/human-resource/admin/training/student-training/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-3xl rounded-[10px] bg-white shadow-xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-xl leading-none text-white hover:opacity-80">×</button>
            </div>

            <div className="p-5">
              {/* Toolbar */}
              <div className="mb-2 flex flex-wrap items-center gap-1.5 rounded border border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-700">
                <select
                  value={noteFontFamily}
                  onChange={(e) => setNoteFontFamily(e.target.value)}
                  className="rounded border border-stroke px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option>Arial</option><option>Times New Roman</option><option>Courier New</option><option>Georgia</option>
                </select>
                <select
                  value={noteFontSize}
                  onChange={(e) => setNoteFontSize(e.target.value)}
                  className="w-16 rounded border border-stroke px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  {["10px","12px","14px","16px","18px","20px","24px"].map(s => <option key={s}>{s}</option>)}
                </select>
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-gray-600" />
                {["B","I","U","S"].map((t) => (
                  <button key={t} className="min-w-[24px] rounded border border-stroke px-1.5 py-0.5 text-xs font-medium hover:bg-gray-200 dark:border-dark-3 dark:hover:bg-gray-600"
                    style={{ fontWeight: t === "B" ? 700 : undefined, fontStyle: t === "I" ? "italic" : undefined, textDecoration: t === "U" ? "underline" : t === "S" ? "line-through" : undefined }}>
                    {t}
                  </button>
                ))}
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-gray-600" />
                {[
                  <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
                  <><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></>,
                ].map((path, i) => (
                  <button key={i} className="rounded border border-stroke p-0.5 hover:bg-gray-200 dark:border-dark-3 dark:hover:bg-gray-600">
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>{path}</svg>
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={6}
                placeholder="Type your note here..."
                style={{ fontFamily: noteFontFamily, fontSize: noteFontSize }}
                className="w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />

              {/* Created By */}
              <div className="mt-3 flex items-center justify-between rounded border border-stroke bg-gray-50 px-4 py-2 dark:border-dark-3 dark:bg-gray-700">
                <button className="text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400">‹</button>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Created By</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin User</p>
                  <p className="text-xs text-gray-400">{new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
                <button className="text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400">›</button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 rounded-b-[10px] border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button
                onClick={() => setShowNoteModal(false)}
                className="rounded bg-[#6c757d] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNoteModal(false)}
                className="rounded bg-[#2d8f7b] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
