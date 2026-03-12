"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RRPDetailRow {
  id: number;
  qrCode: string;
  itemCode: string;
  name: string;
  availableQty: number;
  existingRate: number;
  qtyToRevise: number;
  revisedRate: number;
}

const DETAIL_DATA: RRPDetailRow[] = [
  {
    id: 1,
    qrCode: "2281181852",
    itemCode: "EPM1",
    name: "EXPORT PLACE MAT 35X45CM",
    availableQty: 602.0,
    existingRate: 112.0,
    qtyToRevise: 602.0,
    revisedRate: 113.0,
  },
];

export default function ViewRevisedRetailPricePage() {
  const router = useRouter();
  const [showViewNote, setShowViewNote] = useState(false);

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Revised Retail Price
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Revised Retail Price</li>
          </ol>
        </nav>
      </div>

      {/* Reference Number Section */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Revised Retail Price</h3>
        </div>
        <div className="p-5">
          <p className="mb-1 text-sm font-medium text-dark dark:text-white">Reference Number</p>
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            RRP-2281-2023-26
          </Link>
        </div>
      </div>

      {/* Revised Retail Price Details Table */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center gap-2 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          <h3 className="text-sm font-semibold text-dark dark:text-white">Revised Retail Price Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">QR Code(s)</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Item Code</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Name</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Available Qty (&#8377;)</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Existing Rate (&#8377;)</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">QTY to Revise (&#8377;)</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Revised Rate (&#8377;)</th>
              </tr>
            </thead>
            <tbody>
              {DETAIL_DATA.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}
                >
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.qrCode}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.itemCode}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.name}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.availableQty.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.existingRate.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.qtyToRevise.toFixed(2)}</td>
                  <td className="px-3 py-3 text-center text-dark dark:text-white">{row.revisedRate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="flex justify-end px-5 py-2 gap-1">
          <button className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 dark:border-dark-3">&#171;</button>
          <button className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 dark:border-dark-3">&#8249;</button>
          <button className="flex size-8 items-center justify-center rounded border border-primary bg-primary text-white text-sm">1</button>
          <button className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 dark:border-dark-3">&#8250;</button>
          <button className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 dark:border-dark-3">&#187;</button>
          <select className="ml-1 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none dark:border-dark-3 dark:text-white">
            <option value={500}>500</option>
          </select>
        </div>

        {/* Bottom Buttons */}
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={() => setShowViewNote(true)}
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
            View Note
          </button>
          <button
            onClick={() => router.push("/operational/revised-retail-price/list")}
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* View Note Modal */}
      {showViewNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-base font-semibold text-white">View Note</h3>
              <button
                onClick={() => setShowViewNote(false)}
                className="text-white hover:opacity-80"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-5">
              {/* Note Content */}
              <div className="mb-5 min-h-[120px] rounded border border-stroke bg-gray-50 p-4 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                FINAL APPROVE PLEASE
              </div>

              {/* Navigation dots and arrows */}
              <div className="mb-4 flex items-center justify-end gap-2">
                <span className="size-3 rounded-full bg-[#17a2b8]"></span>
                <button className="flex size-7 items-center justify-center rounded border border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">
                  &#8249;
                </button>
                <button className="flex size-7 items-center justify-center rounded border border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">
                  &#8250;
                </button>
              </div>

              {/* Created By and Final Approved By */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded border border-red-400 p-4 text-center text-sm">
                  <p className="mb-2 font-semibold text-dark dark:text-white">Created By</p>
                  <p className="text-gray-600 dark:text-gray-400">Name : BOOPATHI S K</p>
                  <p className="text-gray-600 dark:text-gray-400">Designation : ASSISTANT SALES MAN</p>
                  <p className="text-gray-600 dark:text-gray-400">Date : 20-07-2023</p>
                </div>
                <div className="rounded border border-red-400 p-4 text-center text-sm">
                  <p className="mb-2 font-semibold text-dark dark:text-white">Final Approved By</p>
                  <p className="text-gray-600 dark:text-gray-400">Name : MOHANAM D</p>
                  <p className="text-gray-600 dark:text-gray-400">Designation : DEPUTY MANAGER(D&amp;P)</p>
                  <p className="text-gray-600 dark:text-gray-400">Date : 20-07-2023</p>
                </div>
              </div>

              {/* Cancel Button */}
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setShowViewNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
