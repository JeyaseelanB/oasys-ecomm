"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const personalInfo = [
  { label: "Employee Type", value: "Permanent" },
  { label: "First Name", value: "SANKARANARAYANAN" },
  { label: "Middle Name", value: "" },
  { label: "Last Name", value: "C" },
  { label: "First Name (In Tamil)", value: "\u0B9A\u0B99\u0BCD\u0B95\u0BB0\u0BA8\u0BBE\u0BB0\u0BBE\u0BAF\u0BA3\u0BA9\u0BCD" },
  { label: "Middle Name (In Tamil)", value: "" },
  { label: "Last Name (In Tamil)", value: "\u0B9A\u0BC6\u0BBE" },
  { label: "Date of Birth", value: "23-Mar-1979" },
  { label: "Age", value: "" },
  { label: "Gender", value: "Male" },
  { label: "Mobile Number", value: "9442331779" },
  { label: "Personal Email", value: "csankaraa@gmail.com" },
  { label: "Marital Status", value: "Married" },
  { label: "Father Name/Spouse Name", value: "CHOCKKALINGAM M" },
];

const additionalInfo = [
  { label: "Nationality", value: "Indian" },
  { label: "Religion", value: "Hindu" },
  { label: "Community", value: "Backward Class (BC)" },
  { label: "Caste", value: "SENGUNTHAR" },
  { label: "Personal Identification 1", value: "A BLACK MOLE ON RIGHT OF NECK" },
  { label: "Personal Identification 2", value: "A BLACK MOLE ON RIGHT ELBOW" },
  { label: "PAN Number", value: "AFBPC3951L" },
  { label: "Aadhaar Number", value: "5864-7028-3526" },
  { label: "Height (in cm)", value: "160" },
  { label: "Weight (in kg)", value: "" },
  { label: "Blood Group", value: "O+" },
  { label: "Ex-Service Man", value: "No" },
  { label: "Differently Abled", value: "No" },
  { label: "Destitute - Widow", value: "No" },
];

const presentAddress = [
  "56B,",
  "KAMARAJARSALAI,THANIKACHALAM NAGAR,E BLOCK,",
  "-",
  "-",
  "CHENNAI,",
  "TAMIL NADU- 627006.",
];

const permanentAddress = [
  "56B,",
  "KAMARAJARSALAI,THANIKACHALAM NAGAR,E BLOCK,",
  "KOLATHUR,",
  "-",
  "CHENNAI,",
  "TAMIL NADU- 600110.",
];

const careerInfo = [
  { id: 1, regNo: "009Y28P033", school: "", qualification: "B.COM (BUSINES TAMIL)", university: "ANNAMALAI UNIVERSITY", passoutYear: "2003", percentage: "" },
  { id: 2, regNo: "156M804260", school: "", qualification: "M.C.A (MASTER OF COMPUTER APPLICATIONS)", university: "ANNAMALAI UNIVERSITY", passoutYear: "2008", percentage: "" },
  { id: 3, regNo: "", school: "", qualification: "TYPEWRITING IN TAMIL HIGHER", university: "", passoutYear: "1999", percentage: "" },
  { id: 4, regNo: "", school: "", qualification: "TYPEWRITING TAMIL LOWER", university: "", passoutYear: "1998", percentage: "" },
  { id: 5, regNo: "", school: "", qualification: "12TH", university: "", passoutYear: "1998", percentage: "" },
  { id: 6, regNo: "136M0S28800263", school: "", qualification: "P.G.D.C.A", university: "ANNAMALAI UNIVERSITY", passoutYear: "2005", percentage: "" },
  { id: 7, regNo: "", school: "", qualification: "TYPEWRITING ENGLISH SENIOR GR", university: "", passoutYear: "1997", percentage: "" },
  { id: 8, regNo: "082507", school: "MDK INSTITUTE OF CO_OP MANAGEMENT, TIRUNELVELI", qualification: "DIPLOMA IN CO-OPERATION", university: "", passoutYear: "1997", percentage: "" },
];

const LockIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

export default function GeneralInformationListPage() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeProfilePassword, setShowChangeProfilePassword] = useState(false);

  const [changePasswordForm, setChangePasswordForm] = useState({
    existingPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changeProfilePasswordForm, setChangeProfilePasswordForm] = useState({
    existingProfilePassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-tight text-dark dark:text-white">
          HR - Employees Profile Details
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Employees Profile Details</li>
          </ol>
        </nav>
      </div>

      {/* Title Bar */}
      <div className="mb-4 rounded bg-[#00bcd4] px-4 py-2.5">
        <h3 className="text-base font-semibold text-white">Employees Profile Details</h3>
      </div>

      {/* Main Content - Profile + Info */}
      <div className="flex gap-6">
        {/* Left Panel - Employee Card */}
        <div className="flex w-[220px] shrink-0 flex-col items-center">
          <div className="mb-3 size-[150px] overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100">
            <Image
              src="/images/user/default-avatar.png"
              alt="Employee Photo"
              width={150}
              height={150}
              className="size-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
          <h4 className="text-center text-sm font-bold text-dark dark:text-white">
            SANKARANARAYANAN C
          </h4>
          <p className="mb-4 text-sm text-gray-500">252</p>

          <button
            onClick={() => setShowChangePassword(true)}
            className="mb-3 w-full rounded bg-[#28a745] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Change Password
          </button>
          <button
            onClick={() => setShowChangeProfilePassword(true)}
            className="w-full rounded bg-[#dc3545] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Change Profile Password
          </button>
        </div>

        {/* Right Panel - Information Sections */}
        <div className="grid flex-1 grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="rounded border border-gray-200 dark:border-dark-3">
            <div className="border-b border-gray-200 px-4 py-2.5 dark:border-dark-3">
              <h4 className="text-base font-semibold text-dark dark:text-white">Personal Information</h4>
            </div>
            <div className="px-4 py-2">
              <table className="w-full">
                <tbody>
                  {personalInfo.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 last:border-0 dark:border-dark-3">
                      <td className="whitespace-nowrap py-2 pr-2 text-sm font-medium text-dark dark:text-gray-300">
                        {item.label}
                      </td>
                      <td className="w-4 py-2 text-center text-sm text-gray-400">:</td>
                      <td className="py-2 pl-2 text-sm font-medium text-[#00bcd4]">
                        {item.value || ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Information */}
          <div className="rounded border border-gray-200 dark:border-dark-3">
            <div className="border-b border-gray-200 px-4 py-2.5 dark:border-dark-3">
              <h4 className="text-base font-semibold text-dark dark:text-white">Additional Information</h4>
            </div>
            <div className="px-4 py-2">
              <table className="w-full">
                <tbody>
                  {additionalInfo.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 last:border-0 dark:border-dark-3">
                      <td className="whitespace-nowrap py-2 pr-2 text-sm font-medium text-dark dark:text-gray-300">
                        {item.label}
                      </td>
                      <td className="w-4 py-2 text-center text-sm text-gray-400">:</td>
                      <td className="py-2 pl-2 text-sm font-medium text-[#00bcd4]">
                        {item.value || ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="mt-6">
        <h4 className="mb-3 text-base font-semibold text-dark dark:text-white">Address Details</h4>
        <div className="grid grid-cols-2 gap-6">
          {/* Present Address */}
          <div className="rounded border border-gray-200 dark:border-dark-3">
            <div className="border-b border-gray-200 px-4 py-2.5 dark:border-dark-3">
              <h5 className="text-sm font-semibold text-dark dark:text-white">Present Address</h5>
            </div>
            <div className="px-4 py-3">
              {presentAddress.map((line, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-dark dark:text-gray-300">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Permanent Address */}
          <div className="rounded border border-gray-200 dark:border-dark-3">
            <div className="border-b border-gray-200 px-4 py-2.5 dark:border-dark-3">
              <h5 className="text-sm font-semibold text-dark dark:text-white">Permanent Address</h5>
            </div>
            <div className="px-4 py-3">
              {permanentAddress.map((line, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-dark dark:text-gray-300">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Career Information */}
      <div className="mt-6">
        <h4 className="mb-3 text-base font-semibold text-dark dark:text-white">Career Information</h4>
        <div className="overflow-x-auto rounded border border-gray-200 dark:border-dark-3">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#00bcd4] text-white">
                <th className="border border-[#00a5b8] px-3 py-2.5 text-center font-semibold">#</th>
                <th className="border border-[#00a5b8] px-3 py-2.5 text-center font-semibold">Registration No</th>
                <th className="border border-[#00a5b8] px-3 py-2.5 text-center font-semibold">Name of School/Institute</th>
                <th className="border border-[#00a5b8] px-3 py-2.5 text-center font-semibold">Qualification</th>
                <th className="border border-[#00a5b8] px-3 py-2.5 text-center font-semibold">Name of University</th>
                <th className="border border-[#00a5b8] px-3 py-2.5 text-center font-semibold">Passout year</th>
                <th className="border border-[#00a5b8] px-3 py-2.5 text-center font-semibold">Percentage of Marks</th>
              </tr>
            </thead>
            <tbody>
              {careerInfo.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-200 dark:border-dark-3 ${
                    idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"
                  }`}
                >
                  <td className="border-r border-gray-200 px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white">
                    {row.id}
                  </td>
                  <td className="border-r border-gray-200 px-3 py-2 text-dark dark:border-dark-3 dark:text-white">
                    {row.regNo}
                  </td>
                  <td className="border-r border-gray-200 px-3 py-2 text-dark dark:border-dark-3 dark:text-white">
                    {row.school}
                  </td>
                  <td className="border-r border-gray-200 px-3 py-2 text-dark dark:border-dark-3 dark:text-white">
                    {row.qualification}
                  </td>
                  <td className="border-r border-gray-200 px-3 py-2 text-dark dark:border-dark-3 dark:text-white">
                    {row.university}
                  </td>
                  <td className="border-r border-gray-200 px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white">
                    {row.passoutYear}
                  </td>
                  <td className="px-3 py-2 text-center text-dark dark:text-white">
                    {row.percentage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[420px] rounded-lg bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#00bcd4] px-5 py-3">
              <h3 className="text-base font-semibold text-white">Change Password</h3>
              <button
                onClick={() => {
                  setShowChangePassword(false);
                  setChangePasswordForm({ existingPassword: "", newPassword: "", confirmPassword: "" });
                }}
                className="text-xl font-bold text-white hover:opacity-80"
              >
                x
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-5 py-4">
              {/* Existing Password */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm text-dark">
                  Existing Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 rounded border border-gray-300 px-3 py-2">
                  <LockIcon />
                  <input
                    type="password"
                    className="w-full bg-transparent text-sm outline-none"
                    value={changePasswordForm.existingPassword}
                    onChange={(e) =>
                      setChangePasswordForm((f) => ({ ...f, existingPassword: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm text-dark">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 rounded border border-gray-300 px-3 py-2">
                  <LockIcon />
                  <input
                    type="password"
                    className="w-full bg-transparent text-sm outline-none"
                    value={changePasswordForm.newPassword}
                    onChange={(e) =>
                      setChangePasswordForm((f) => ({ ...f, newPassword: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm text-dark">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 rounded border border-gray-300 px-3 py-2">
                  <LockIcon />
                  <input
                    type="password"
                    className="w-full bg-transparent text-sm outline-none"
                    value={changePasswordForm.confirmPassword}
                    onChange={(e) =>
                      setChangePasswordForm((f) => ({ ...f, confirmPassword: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Note */}
              <p className="mb-4 text-sm text-[#00bcd4]">
                Note: You will be redirected to login page once password is changed.
              </p>

              {/* Submit Button */}
              <button className="w-full rounded bg-[#28a745] py-2.5 text-sm font-semibold text-white hover:opacity-90">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Profile Password Modal */}
      {showChangeProfilePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[420px] rounded-lg bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#00bcd4] px-5 py-3">
              <h3 className="text-base font-semibold text-white">Change Profile Password</h3>
              <button
                onClick={() => {
                  setShowChangeProfilePassword(false);
                  setChangeProfilePasswordForm({ existingProfilePassword: "", newPassword: "", confirmPassword: "" });
                }}
                className="text-xl font-bold text-white hover:opacity-80"
              >
                x
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-5 py-4">
              {/* Existing Profile Password */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm text-dark">
                  Existing Profile Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 rounded border border-gray-300 px-3 py-2">
                  <LockIcon />
                  <input
                    type="password"
                    className="w-full bg-transparent text-sm outline-none"
                    value={changeProfilePasswordForm.existingProfilePassword}
                    onChange={(e) =>
                      setChangeProfilePasswordForm((f) => ({ ...f, existingProfilePassword: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm text-dark">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 rounded border border-gray-300 px-3 py-2">
                  <LockIcon />
                  <input
                    type="password"
                    className="w-full bg-transparent text-sm outline-none"
                    value={changeProfilePasswordForm.newPassword}
                    onChange={(e) =>
                      setChangeProfilePasswordForm((f) => ({ ...f, newPassword: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm text-dark">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 rounded border border-gray-300 px-3 py-2">
                  <LockIcon />
                  <input
                    type="password"
                    className="w-full bg-transparent text-sm outline-none"
                    value={changeProfilePasswordForm.confirmPassword}
                    onChange={(e) =>
                      setChangeProfilePasswordForm((f) => ({ ...f, confirmPassword: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Note */}
              <p className="mb-4 text-sm text-[#00bcd4]">
                Note: You will be redirected to login page once password is changed.
              </p>

              {/* Submit Button */}
              <button className="w-full rounded bg-[#28a745] py-2.5 text-sm font-semibold text-white hover:opacity-90">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
