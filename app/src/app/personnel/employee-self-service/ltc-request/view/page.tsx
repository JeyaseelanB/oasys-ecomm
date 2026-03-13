"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Member {
  id: number;
  name: string;
  age: number;
  relationship: string;
}

const MEMBERS: Member[] = [
  { id: 1, name: "Test", age: 21, relationship: "Son" },
];

export default function LTCRequestViewPage() {
  const router = useRouter();
  const [showMembers, setShowMembers] = useState(false);

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Leave Travel Concession
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Leave Travel Concession</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Leave Travel Concession</h3>
        </div>

        <div className="p-5">
          {/* Info Fields */}
          {/* Row 1 */}
          <div className="mb-1 grid grid-cols-4 gap-x-6">
            <p className="text-xs text-gray-500">Block Years</p>
            <p className="text-xs text-gray-500">LTC From Date</p>
            <p className="text-xs text-gray-500">LTC To Date</p>
            <p className="text-xs text-gray-500">No. of Days</p>
          </div>
          <div className="mb-4 grid grid-cols-4 gap-x-6">
            <p className="text-sm font-semibold text-[#17b8c8]">2020- 2024</p>
            <p className="text-sm font-semibold text-[#17b8c8]">22-Mar-2024</p>
            <p className="text-sm font-semibold text-[#17b8c8]">22-Mar-2024</p>
            <p className="text-sm font-semibold text-[#17b8c8]">1</p>
          </div>

          {/* Row 2 */}
          <div className="mb-1 grid grid-cols-4 gap-x-6">
            <p className="text-xs text-gray-500">Eligible Distance (Km)</p>
            <p className="text-xs text-gray-500">Travelled Distance (Km)</p>
            <p className="text-xs text-gray-500">Applied For</p>
            <p className="text-xs text-gray-500">Mode of Travel</p>
          </div>
          <div className="mb-4 grid grid-cols-4 gap-x-6">
            <p className="text-sm font-semibold text-[#17b8c8]">2500.00</p>
            <p className="text-sm font-semibold text-[#17b8c8]">200.00</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[#17b8c8]">Family</p>
              <button
                type="button"
                onClick={() => setShowMembers(true)}
                className="flex items-center gap-1 rounded bg-[#17b8c8] px-2 py-0.5 text-xs font-medium text-white hover:opacity-90"
              >
                <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View Members
              </button>
            </div>
            <p className="text-sm font-semibold text-[#17b8c8]">By Bus</p>
          </div>

          {/* Row 3 */}
          <div className="mb-1 grid grid-cols-4 gap-x-6">
            <p className="text-xs text-gray-500">Type of Leave</p>
          </div>
          <div className="mb-4 grid grid-cols-4 gap-x-6">
            <p className="text-sm font-semibold text-[#17b8c8]">Earned Leave</p>
          </div>

          {/* Row 4 */}
          <div className="mb-1 grid grid-cols-4 gap-x-6">
            <p className="text-xs text-gray-500">Cost of Ticket (₹)</p>
            <p className="text-xs text-gray-500">Supporting Documents</p>
          </div>
          <div className="mb-6 grid grid-cols-4 gap-x-6">
            <p className="text-sm font-semibold text-[#17b8c8]">5.00</p>
            <div>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded bg-[#17b8c8] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="15,18 9,12 15,6" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Members List Modal */}
      {showMembers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-[10px] bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
              <h4 className="text-sm font-semibold text-white">Members List</h4>
              <button type="button" onClick={() => setShowMembers(false)}
                className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="px-4 py-2 text-center font-semibold">#</th>
                      <th className="px-4 py-2 text-left font-semibold">Name</th>
                      <th className="px-4 py-2 text-center font-semibold">Age</th>
                      <th className="px-4 py-2 text-left font-semibold">Relationship</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MEMBERS.map((m) => (
                      <tr key={m.id} className="border-b border-stroke last:border-0 dark:border-dark-3">
                        <td className="px-4 py-2 text-center">{m.id}</td>
                        <td className="px-4 py-2">{m.name}</td>
                        <td className="px-4 py-2 text-center">{m.age}</td>
                        <td className="px-4 py-2">{m.relationship}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
