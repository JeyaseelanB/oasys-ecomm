"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateLeaveTravelConcessionPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [appliedFor, setAppliedFor] = useState("Self");
  const [holidayPermission, setHolidayPermission] = useState("No");

  const [noteCards, setNoteCards] = useState([
    { title: "", name: "", designation: "", date: "" },
  ]);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Add Leave Travel Concession</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Add Leave Travel Concession</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">Leave Travel Concession</h3>
        </div>

        <div className="p-5">
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">HO/RO <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <select className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="SALEM">SALEM</option>
                  <option value="CHENNAI">CHENNAI</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Entity Type <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <select className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="Distribution Warehouse">Distribution Warehouse</option>
                  <option value="D & P Office">D & P Office</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Entity Code <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <select className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="DWH - SALEM">DWH - SALEM</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Department Code <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <select className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="MARKETING">MARKETING</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Section <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <select className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="GENERAL">GENERAL</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Employee PF <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <select className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="174 / LAVANYA M">174 / LAVANYA M</option>
                  <option value="572 / KANNAN">572 / KANNAN</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Block Year <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <select className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="2024-2027">2024-2027</option>
                  <option value="2020-2023">2020-2023</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Eligible Distance (KM) <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <input type="text" className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Row 3 - Dates */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">From Date <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <input type="date" className="w-full rounded-l border border-r-0 border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                <span className="inline-flex items-center rounded-r border border-l-0 border-stroke px-3 py-2.5 text-white" style={{ backgroundColor: "#17a2b8" }}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">To Date <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <input type="date" className="w-full rounded-l border border-r-0 border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                <span className="inline-flex items-center rounded-r border border-l-0 border-stroke px-3 py-2.5 text-white" style={{ backgroundColor: "#17a2b8" }}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">No. of Days <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <input type="text" readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Travelled Distance (KM) <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <input type="text" className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Row 4 - Applied For, Mode, Class, Type of Leave */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Applied For <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center gap-4 py-2.5">
                <label className="flex items-center gap-1.5 text-sm text-[#495057]">
                  <input type="radio" name="appliedFor" value="Self" checked={appliedFor === "Self"} onChange={() => setAppliedFor("Self")} className="accent-[#17a2b8]" />
                  Self
                </label>
                <label className="flex items-center gap-1.5 text-sm text-[#495057]">
                  <input type="radio" name="appliedFor" value="Family" checked={appliedFor === "Family"} onChange={() => setAppliedFor("Family")} className="accent-[#17a2b8]" />
                  Family
                </label>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Mode of Travel <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <select className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="Train">Train</option>
                  <option value="Bus">Bus</option>
                  <option value="Air">Air</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Travel Class <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <select className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="Sleeper Class">Sleeper Class</option>
                  <option value="AC 3 Tier">AC 3 Tier</option>
                  <option value="AC 2 Tier">AC 2 Tier</option>
                  <option value="AC First Class">AC First Class</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Type of Leave <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <select className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Earned Leave">Earned Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 5 - Leave Balance, Leave From/To, No of Days, Cost */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Leave Balance <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <input type="text" readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Leave From Date <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <input type="date" className="w-full rounded-l border border-r-0 border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                <span className="inline-flex items-center rounded-r border border-l-0 border-stroke px-3 py-2.5 text-white" style={{ backgroundColor: "#17a2b8" }}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Leave To Date <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <input type="date" className="w-full rounded-l border border-r-0 border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                <span className="inline-flex items-center rounded-r border border-l-0 border-stroke px-3 py-2.5 text-white" style={{ backgroundColor: "#17a2b8" }}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">No. of Days <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <input type="text" readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Row 6 - Cost of Ticket */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Cost of Ticket <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <input type="text" className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Upload Documents */}
          <div className="mb-4 border-t border-stroke pt-4 dark:border-dark-3">
            <label className="mb-1.5 block text-sm font-medium text-[#495057]">Upload Documents</label>
            <div className="flex items-center gap-4">
              <input type="file" className="w-full max-w-md rounded border border-stroke px-3 py-2 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              <button className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#17a2b8" }}>
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Upload
              </button>
            </div>
          </div>

          {/* Holiday Permission */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Whether holiday permissions required <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center gap-4 py-2.5">
                <label className="flex items-center gap-1.5 text-sm text-[#495057]">
                  <input type="radio" name="holidayPermission" value="Yes" checked={holidayPermission === "Yes"} onChange={() => setHolidayPermission("Yes")} className="accent-[#17a2b8]" />
                  Yes
                </label>
                <label className="flex items-center gap-1.5 text-sm text-[#495057]">
                  <input type="radio" name="holidayPermission" value="No" checked={holidayPermission === "No"} onChange={() => setHolidayPermission("No")} className="accent-[#17a2b8]" />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Forward Section */}
          <div className="mb-5 border-t border-stroke pt-4 dark:border-dark-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#495057]">Forward To <span className="text-[#dc3545]">*</span></label>
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                  </span>
                  <input type="text" readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#495057]">Forward For <span className="text-[#dc3545]">*</span></label>
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                  </span>
                  <select defaultValue="Approval" className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                    <option value="Approval">Approval</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
              Create Note
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => router.push("/personnel/human-resource/leave-travel-concession/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Rich Text Toolbar */}
              <div className="mb-0 flex flex-wrap items-center gap-1 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                {["B", "I", "U", "S", "F", "D"].map((btn) => (
                  <button key={btn} className="rounded px-2 py-1 text-xs font-bold text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-3">
                    {btn}
                  </button>
                ))}
                <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></span>
                <button className="rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </button>
                <button className="rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </button>
              </div>
              <textarea rows={5} className="w-full rounded-b border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" placeholder="Enter note content..."></textarea>

              {/* Note Cards */}
              <div className="mb-4 mt-4 flex items-start gap-4">
                {noteCards.map((card, idx) => (
                  <div key={idx} className="flex-1">
                    <div className="border-t-2 border-[#E67E22]"></div>
                    <div className="rounded-b border border-t-0 border-stroke p-4 dark:border-dark-3">
                      <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</p>
                      <p className="text-xs text-dark dark:text-white">Name : <span className="font-semibold">{card.name || "—"}</span></p>
                      <p className="text-xs text-dark dark:text-white">Designation : <span className="font-semibold text-[#17a2b8]">{card.designation || "—"}</span></p>
                      <p className="text-xs text-dark dark:text-white">Date : <span className="font-semibold">{card.date || "—"}</span></p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button className="text-gray-400 hover:text-dark dark:hover:text-white">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                  </button>
                  <button className="text-gray-400 hover:text-dark dark:hover:text-white">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Cancel
                  </button>
                  <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
