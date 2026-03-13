"use client";

import Link from "next/link";
import { useState } from "react";

type Section =
  | "primary"
  | "additional"
  | "employment"
  | "payScale"
  | "address"
  | "family"
  | "educational"
  | "workExp"
  | "achievements";

const SIDEBAR_ITEMS: { key: Section; label: string; icon: React.ReactNode }[] = [
  { key: "primary", label: "Primary Info", icon: <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 1.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM8.75 6a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM12 12.25c-2.313 0-4.445.526-6.024 1.414C4.42 14.54 3.25 15.866 3.25 17.5v.102c-.001 1.162-.002 2.62 1.277 3.662.629.512 1.51.877 2.7 1.117 1.192.242 2.747.369 4.773.369s3.58-.127 4.774-.369c1.19-.24 2.07-.605 2.7-1.117 1.279-1.042 1.277-2.5 1.276-3.662V17.5c0-1.634-1.17-2.96-2.725-3.836-1.58-.888-3.711-1.414-6.025-1.414z" /></svg> },
  { key: "additional", label: "Additional Info", icon: <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 1.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5z" /></svg> },
  { key: "employment", label: "Employment Details", icon: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><path d="M9 21V9" /></svg> },
  { key: "payScale", label: "Pay Scale Information", icon: <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M18.29 4.89c-1.028-.138-2.383-.14-4.29-.14h-4c-1.907 0-3.261.002-4.29.14-1.005.135-1.585.389-2.008.812-.423.423-.677 1.003-.812 2.009-.138 1.028-.14 2.382-.14 4.289 0 1.907.002 3.261.14 4.29.135 1.005.389 1.585.812 2.008.423.423 1.003.677 2.009.812 1.028.138 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14 1.005-.135 1.585-.389 2.008-.812.423-.423.677-1.003.812-2.009.138-1.028.14-2.382.14-4.289 0-1.907-.002-3.261-.14-4.29-.135-1.005-.389-1.585-.812-2.008-.423-.423-1.003-.677-2.009-.812z" /></svg> },
  { key: "address", label: "Address & Contacts", icon: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg> },
  { key: "family", label: "Family Details", icon: <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 1.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM8.75 6a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM12 12.25c-2.313 0-4.445.526-6.024 1.414C4.42 14.54 3.25 15.866 3.25 17.5v.102c-.001 1.162-.002 2.62 1.277 3.662.629.512 1.51.877 2.7 1.117 1.192.242 2.747.369 4.773.369s3.58-.127 4.774-.369c1.19-.24 2.07-.605 2.7-1.117 1.279-1.042 1.277-2.5 1.276-3.662V17.5c0-1.634-1.17-2.96-2.725-3.836-1.58-.888-3.711-1.414-6.025-1.414z" /></svg> },
  { key: "educational", label: "Educational Qualification", icon: <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg> },
  { key: "workExp", label: "Previous Work Experience", icon: <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg> },
  { key: "achievements", label: "Achievements", icon: <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg> },
];

const STEPS = [
  { label: "Personal Information", icon: <svg className="size-5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 1.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5z" /></svg> },
  { label: "Career Profile", icon: <svg className="size-5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2a5 5 0 100 10A5 5 0 0012 2z" /></svg> },
  { label: "Leave Details", icon: <svg className="size-5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-4 9.5l2.5 2.5 5.5-5.5 1.5 1.5-7 7-4-4 1.5-1.5z" /></svg> },
  { label: "Others", icon: <svg className="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg> },
];

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-[#17a2b8]">{value || "-"}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 border-b border-stroke pb-2 dark:border-dark-3">
      <h3 className="text-sm font-semibold text-dark dark:text-white">{children}</h3>
    </div>
  );
}

function TableSection({ title, headers, rows, mandatory }: { title: string; headers: string[]; rows: (string | number)[][]; mandatory?: boolean }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-dark dark:text-white">{title}</h3>
        {mandatory && <span className="text-xs text-gray-500">( * Mandatory Fields )</span>}
      </div>
      <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#2d8f7b] text-white">
              {headers.map((h) => (
                <th key={h} className="whitespace-nowrap border border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={headers.length} className="py-6 text-center text-xs text-gray-400">No records found{mandatory ? "." : ""}</td></tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-stroke px-3 py-2.5 text-center text-xs text-[#17a2b8] dark:border-dark-3">{cell}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ViewEmployeeRegisterPage() {
  const [activeSection, setActiveSection] = useState<Section>("primary");

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Employee Service Register
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400"><Link href="/personnel/human-resource/employee-register/list" className="hover:underline">Employee Service Register List</Link></li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Employee Service Register</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Stepper */}
        <div className="bg-[#17a2b8] px-6 py-5">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-white/30" />
            {STEPS.map((step) => (
              <div key={step.label} className="relative z-10 flex flex-col items-center gap-2">
                <div className="flex size-11 items-center justify-center rounded-full border-2 border-white bg-white/20 text-white">
                  {step.icon}
                </div>
                <span className="hidden text-xs font-medium text-white sm:block">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body: sidebar + content */}
        <div className="flex min-h-[500px]">
          {/* Left Sidebar */}
          <div className="w-52 shrink-0 border-r border-stroke dark:border-dark-3">
            {/* Employee card */}
            <div className="flex flex-col items-center border-b border-stroke py-5 dark:border-dark-3">
              <div className="mb-2 size-24 overflow-hidden rounded bg-gray-100 dark:bg-dark-2">
                <svg className="h-full w-full text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM8.75 6a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM12 12.25c-2.313 0-4.445.526-6.024 1.414C4.42 14.54 3.25 15.866 3.25 17.5v.102c-.001 1.162-.002 2.62 1.277 3.662.629.512 1.51.877 2.7 1.117 1.192.242 2.747.369 4.773.369s3.58-.127 4.774-.369c1.19-.24 2.07-.605 2.7-1.117 1.279-1.042 1.277-2.5 1.276-3.662V17.5c0-1.634-1.17-2.96-2.725-3.836-1.58-.888-3.711-1.414-6.025-1.414z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-dark dark:text-white">RAJ MOHAN</p>
              <p className="text-xs text-gray-500">3588</p>
            </div>
            {/* Nav items */}
            <nav className="py-2">
              {SIDEBAR_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${activeSection === item.key ? "bg-[#17a2b8] font-semibold text-white" : "text-dark hover:bg-gray-50 dark:text-white dark:hover:bg-dark-2"}`}
                >
                  <span className={activeSection === item.key ? "text-white" : "text-gray-400"}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6">
            {/* Primary Info */}
            {activeSection === "primary" && (
              <div>
                <SectionTitle>Primary Information</SectionTitle>
                <div className="mb-4">
                  <p className="mb-1 text-xs text-gray-500">Employment Type</p>
                  <p className="text-sm font-medium text-[#17a2b8]">Permanent</p>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
                  <InfoCell label="First Name" value="Mr  RAJ MOHAN" />
                  <InfoCell label="Middle Name" value="" />
                  <InfoCell label="Last Name" value="R" />
                  <InfoCell label="First Name (In Tamil)" value="ராஜ் மோகன்" />
                  <InfoCell label="Middle Name (In Tamil)" value="" />
                  <InfoCell label="Last Name (In Tamil)" value="ரா" />
                  <InfoCell label="Employee Display Name" value="" />
                  <InfoCell label="Date of Birth" value="21-Jul-1981" />
                  <InfoCell label="Gender" value="Male" />
                  <InfoCell label="Mobile Number" value="9841605909" />
                  <InfoCell label="Personal Email" value="rrajmohan1981@gmail.com" />
                  <InfoCell label="Status" value="Active" />
                  <InfoCell label="Joined Department" value="ADMIN" />
                  <InfoCell label="Joined Designation" value="JUNIOR ASSISTANT" />
                  <InfoCell label="Joined Region" value="HEAD OFFICE" />
                </div>
              </div>
            )}

            {/* Additional Info */}
            {activeSection === "additional" && (
              <div>
                <SectionTitle>Additional Information</SectionTitle>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
                  <InfoCell label="Marital Status" value="Married" />
                  <InfoCell label="Father Name / Spouse Name" value="R.RAJENDRAN" />
                  <InfoCell label="Nationality" value="Indian" />
                  <InfoCell label="Religion" value="Hindu" />
                  <InfoCell label="Community" value="Most Backward Class (MBC)" />
                  <InfoCell label="Caste" value="Gounder" />
                  <InfoCell label="Personal Identification 1" value="A MOLE ON THE LEFT HAND" />
                  <InfoCell label="Personal Identification 2" value="TWO MOLES BELOW THE LOWER LIP" />
                  <InfoCell label="PAN Number" value="AKOPR0070R" />
                  <InfoCell label="Aadhaar Number" value="9713-2137-1200" />
                  <InfoCell label="Height (in cm)" value="172" />
                  <InfoCell label="Weight (in kg)" value="" />
                  <InfoCell label="Blood Group" value="" />
                  <InfoCell label="Ex-Service Man" value="No" />
                  <InfoCell label="Differently Abled" value="No" />
                  <InfoCell label="Destitute Widow" value="" />
                </div>
              </div>
            )}

            {/* Employment Details */}
            {activeSection === "employment" && (
              <div>
                <SectionTitle>Employment Details</SectionTitle>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
                  <InfoCell label="Employee Number" value="196" />
                  <InfoCell label="Employee Type" value="Permanent" />
                  <InfoCell label="Entity Type" value="Head Office" />
                  <InfoCell label="Entity" value="HEAD OFFICE" />
                  <InfoCell label="Designation" value="SENIOR REGIONAL MANAGER(SG)" />
                  <InfoCell label="Department" value="ADMIN" />
                  <InfoCell label="Current Section" value="Government Scheme" />
                  <InfoCell label="Seniority Number" value="0" />
                  <InfoCell label="Date of Appointment" value="09-May-1989" />
                  <InfoCell label="Date of Joining" value="09-May-1989" />
                  <InfoCell label="Date of Confirmation" value="09-May-1989" />
                  <InfoCell label="Date of Retirement" value="24-Jul-2056" />
                  <InfoCell label="Date of Resignation" value="" />
                  <InfoCell label="Date of VRS" value="" />
                  <InfoCell label="Date of Death / Removal" value="" />
                  <InfoCell label="Consolidate Pay" value="7500" />
                  <InfoCell label="Reporting To" value="3234 / ARULRAJAN K / REGIONAL MANAGER" />
                  <InfoCell label="PF Number" value="3588" />
                  <InfoCell label="Universal Account Number" value="100288560937" />
                </div>
              </div>
            )}

            {/* Pay Scale */}
            {activeSection === "payScale" && (
              <TableSection
                title="Pay Scale Information"
                headers={["#", "Reference Number", "Reference Date", "Designation", "Pay Scale", "Revised Payscale", "Revised Basic Pay", "Effective Date"]}
                rows={[
                  [1, "", "18-Sep-2018", "JUNIOR ASSISTANT", "4250 - 20200", "4250 - 20200", "13260", "01-Jul-2018"],
                  [2, "", "22-Dec-2018", "SENIOR ASSISTANT", "5200 - 20200", "5200 - 20200", "13660", "01-Jul-2018"],
                  [3, "", "22-Dec-2018", "SENIOR ASSISTANT", "5200 - 20200", "5200 - 20200", "5810", "09-May-2018"],
                  [4, "", "16-Jul-2014", "JUNIOR ASSISTANT", "4250 - 20200", "4250 - 20200", "4250", "09-May-2014"],
                  [5, "", "25-Sep-2014", "JUNIOR ASSISTANT", "4250 - 20200", "4250 - 20200", "5000", "09-May-2014"],
                ]}
              />
            )}

            {/* Address & Contacts */}
            {activeSection === "address" && (
              <div className="space-y-5">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-dark dark:text-white">Address Details</h3>
                    <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="18,15 12,9 6,15" /></svg>
                  </div>
                  <div className="mb-4">
                    <p className="mb-3 text-sm font-semibold text-dark dark:text-white">Permanent Address</p>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
                      <InfoCell label="Address Line 1" value="NO:1" />
                      <InfoCell label="Address Line 2" value="PALANIAPPAN STREET, MUTHURANGAM BLOCK" />
                      <InfoCell label="Address Line 3" value="JAFFERKHANPET," />
                      <InfoCell label="State" value="TAMIL NADU" />
                      <InfoCell label="District" value="CHENNAI" />
                      <InfoCell label="Taluk" value="" />
                      <InfoCell label="City" value="CHENNAI" />
                      <InfoCell label="Village" value="" />
                      <InfoCell label="Postal Code" value="600083" />
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-semibold text-dark dark:text-white">Present Address</p>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
                      <InfoCell label="Address Line 1" value="NO:1" />
                      <InfoCell label="Address Line 2" value="PALANIAPPAN STREET, MUTHURANGAM BLOCK" />
                      <InfoCell label="Address Line 3" value="JAFFERKHANPET," />
                      <InfoCell label="State" value="TAMIL NADU" />
                      <InfoCell label="District" value="CHENNAI" />
                      <InfoCell label="Taluk" value="" />
                      <InfoCell label="City" value="CHENNAI" />
                      <InfoCell label="Village" value="" />
                      <InfoCell label="Postal Code" value="600083" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-dark dark:text-white">Contact Details</h3>
                    <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="18,15 12,9 6,15" /></svg>
                  </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
                    <InfoCell label="Emergency Contact Number" value="9841605909" />
                    <InfoCell label="Office Landline Number" value="" />
                    <InfoCell label="Alternate Email" value="rajmohan1981@gmail.com" />
                  </div>
                </div>
              </div>
            )}

            {/* Family Details */}
            {activeSection === "family" && (
              <TableSection
                title="Family Details"
                headers={["#", "Name", "Date of Birth", "Age", "Gender", "Relationship", "Insurance", "Insurance Type"]}
                rows={[]}
              />
            )}

            {/* Educational Qualification */}
            {activeSection === "educational" && (
              <TableSection
                title="Educational Qualification"
                headers={["#", "Registration No", "Name of School/Institute", "Qualification", "Medium of Board/University", "Passed Out Year", "Percentage of Marks", "Certification No"]}
                rows={[
                  [1, "2209", "", "10 TH (REVISED PATTERN)", "", "", "", ""],
                  [2, "", "", "TYPEWRITING ENGLISH SENIOR GR", "", "2000", "", ""],
                  [3, "", "", "COMPUTER AIDED ACCOUNTING & MANAGEMENT", "", "2007", "", ""],
                  [4, "", "", "MECHANIC (RADIO & TELEVISION)", "", "2001", "", ""],
                  [5, "809176", "", "12TH", "", "1999", "", ""],
                  [6, "009Z03T10929", "", "B.COM (CO-OPERATION)", "ANNAMALAI UNIVERSITY", "2004", "", ""],
                  [7, "", "", "", "", "", "", ""],
                  [8, "", "NATIONAL APPRENTICESHIP", "ELECTRONICS MECHANIC", "", "2003", "", ""],
                ]}
                mandatory
              />
            )}

            {/* Previous Work Experience */}
            {activeSection === "workExp" && (
              <TableSection
                title="Previous Work Experience"
                headers={["#", "Company Name", "Designation", "Date of Joining", "Relieving Date", "Last drawn salary (₹)", "Action"]}
                rows={[]}
              />
            )}

            {/* Achievements */}
            {activeSection === "achievements" && (
              <TableSection
                title="Achievements"
                headers={["#", "Award Name", "Awarded date", "Awarded by"]}
                rows={[]}
              />
            )}

            {/* Back button */}
            <div className="mt-6 flex justify-end">
              <Link
                href="/personnel/human-resource/employee-register/list"
                className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12,19 5,12 12,5" />
                </svg>
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
