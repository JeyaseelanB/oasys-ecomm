"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EngagementDetailRow {
  id: number;
  region: string;
  silkSarees: number;
  otherThanSilkSales: number;
  silkSareesPerStaff: number;
  otherThanSilkPerStaff: number;
  sanctionedStaffStrength: number;
  totalStaffEligible: number;
  totalStaffOnRole: number;
  excessCount: number;
  shortageCount: number;
  approvalCount: number;
}

interface EntityDetailRow {
  id: number;
  entity: string;
  areaInSqft: number;
  sanctionedStaffStrength: number;
  totalStaffEligible: number;
  totalStaffOnRole: number;
  excessCount: number;
  shortageCount: number;
}

const MOCK_ENGAGEMENT_DATA: EngagementDetailRow[] = [
  {
    id: 1, region: "CHENNAI", silkSarees: 0.00, otherThanSilkSales: 188253.30,
    silkSareesPerStaff: 0.00, otherThanSilkPerStaff: 0.00,
    sanctionedStaffStrength: 0, totalStaffEligible: 0,
    totalStaffOnRole: 32, excessCount: 32, shortageCount: 0, approvalCount: 0,
  },
];

const MOCK_ENTITY_DATA: EntityDetailRow[] = [
  { id: 1, entity: "TRADE FAIR", areaInSqft: 150, sanctionedStaffStrength: 0, totalStaffEligible: 0, totalStaffOnRole: 1, excessCount: 1, shortageCount: 0 },
  { id: 2, entity: "MOP VAISHNAV", areaInSqft: 1000, sanctionedStaffStrength: 0, totalStaffEligible: 0, totalStaffOnRole: 0, excessCount: 0, shortageCount: 0 },
  { id: 3, entity: "G20 EXHIBITION", areaInSqft: 200, sanctionedStaffStrength: 0, totalStaffEligible: 0, totalStaffOnRole: 0, excessCount: 0, shortageCount: 0 },
  { id: 4, entity: "DHOTHY LUNGHY ORGANIC", areaInSqft: 1500, sanctionedStaffStrength: 0, totalStaffEligible: 0, totalStaffOnRole: 0, excessCount: 0, shortageCount: 0 },
  { id: 5, entity: "TEYNAMPET", areaInSqft: 1000, sanctionedStaffStrength: 0, totalStaffEligible: 0, totalStaffOnRole: 1, excessCount: 1, shortageCount: 0 },
  { id: 6, entity: "HANDLOOM EXPO", areaInSqft: 150, sanctionedStaffStrength: 0, totalStaffEligible: 0, totalStaffOnRole: 0, excessCount: 0, shortageCount: 0 },
  { id: 7, entity: "HOMETEX EGMORE", areaInSqft: 1000, sanctionedStaffStrength: 0, totalStaffEligible: 0, totalStaffOnRole: 0, excessCount: 0, shortageCount: 0 },
  { id: 8, entity: "CHENNAI VIZHA 2023", areaInSqft: 1000, sanctionedStaffStrength: 0, totalStaffEligible: 0, totalStaffOnRole: 0, excessCount: 0, shortageCount: 0 },
  { id: 9, entity: "E-COMMERCE", areaInSqft: 1, sanctionedStaffStrength: 0, totalStaffEligible: 0, totalStaffOnRole: 2, excessCount: 2, shortageCount: 0 },
  { id: 10, entity: "COOPTEX AVADI", areaInSqft: 1000, sanctionedStaffStrength: 0, totalStaffEligible: 0, totalStaffOnRole: 2, excessCount: 2, shortageCount: 0 },
];

export default function ViewTemporaryEngagementPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showEntityModal, setShowEntityModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleViewEntity = (region: string) => {
    setSelectedRegion(region);
    setShowEntityModal(true);
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Recruitment Process - View Temporary Engagement</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Recruitment Process</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Temporary Engagement</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Temporary Engagement</h3>
        </div>

        <div className="p-5">
          {/* Row 1: Region, Department, Designation */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div><p className="text-xs text-gray-500">Region</p><p className="text-sm font-medium text-[#17a2b8]">CHENNAI</p></div>
            <div><p className="text-xs text-gray-500">Department</p><p className="text-sm font-medium text-[#17a2b8]">MARKETING</p></div>
            <div><p className="text-xs text-gray-500">Designation</p><p className="text-sm font-medium text-[#17a2b8]">MANAGER GRADE I, MANAGER ...</p></div>
          </div>

          {/* Row 2: Sales Period From, Sales Period To, Recruitment year, Remark */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div><p className="text-xs text-gray-500">Sales Period From</p><p className="text-sm font-medium text-[#17a2b8]">01-Jan-2025</p></div>
            <div><p className="text-xs text-gray-500">Sales Period To</p><p className="text-sm font-medium text-[#17a2b8]">28-Feb-2025</p></div>
            <div><p className="text-xs text-gray-500">Recruitment year</p><p className="text-sm font-medium text-[#17a2b8]">2025</p></div>
            <div><p className="text-xs text-gray-500">Remark</p><p className="text-sm font-medium text-dark dark:text-white">zfzsfz</p></div>
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
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" colSpan={2}>Annual Sales (in Lakhs)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" colSpan={2}>No.of Staff eligible</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Sanctioned Staff Strength</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Staff Eligible</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Staff On-Role</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Excess Count</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Shortage Count</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Approval Count</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-1.5"></th>
                    <th className="border border-[#3aa88f] px-2 py-1.5"></th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-medium">Silk Sarees</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-medium">Other than Silk sales</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-medium">Silk Sarees @ Rs.75.90 Lakhs / Staff</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-medium">Other than Silk sales @ Rs.32.52 Lakhs / Staff</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5"></th>
                    <th className="border border-[#3aa88f] px-2 py-1.5"></th>
                    <th className="border border-[#3aa88f] px-2 py-1.5"></th>
                    <th className="border border-[#3aa88f] px-2 py-1.5"></th>
                    <th className="border border-[#3aa88f] px-2 py-1.5"></th>
                    <th className="border border-[#3aa88f] px-2 py-1.5"></th>
                    <th className="border border-[#3aa88f] px-2 py-1.5"></th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ENGAGEMENT_DATA.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.region}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.silkSarees.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.otherThanSilkSales.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.silkSareesPerStaff.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.otherThanSilkPerStaff.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.sanctionedStaffStrength}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.totalStaffEligible}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.totalStaffOnRole}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.excessCount}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.shortageCount}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <input type="number" defaultValue={row.approvalCount} className="w-16 rounded border border-stroke bg-transparent px-2 py-1 text-center text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                      </td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <button onClick={() => handleViewEntity(row.region)} className="rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              View Note
            </button>
            <button onClick={() => router.push("/personnel/human-resource/recruitment-process/temporary-engagement/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4 min-h-[120px] rounded border border-stroke bg-gray-50 p-4 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                cv
              </div>
              <div className="flex justify-end">
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Entity Detail Modal */}
      {showEntityModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-5xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Temporary Engagement - {selectedRegion}</h3>
              <button onClick={() => setShowEntityModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                      <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Entity</th>
                      <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Area in Sqft</th>
                      <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Sanctioned Staff Strength</th>
                      <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Staff Eligible</th>
                      <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Staff On-Role</th>
                      <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Excess Count</th>
                      <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Shortage Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ENTITY_DATA.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.entity}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.areaInSqft}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.sanctionedStaffStrength}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.totalStaffEligible}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.totalStaffOnRole}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.excessCount}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.shortageCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setShowEntityModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
