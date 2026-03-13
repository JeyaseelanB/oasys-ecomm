"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TenderDetailItem {
  id: number;
  itemCodeName: string;
  quantity: number;
  specifications: string;
  description: string;
  itemAmount: number;
  quotationAmount: number;
}

const MOCK_TENDER_DETAILS: TenderDetailItem[] = [
  {
    id: 1,
    itemCodeName: "PKW1 / Pure Zari Silk Pavadai 50Cmx120mt",
    quantity: 10.00,
    specifications: "trial",
    description: "trial",
    itemAmount: 100.00,
    quotationAmount: 0.00,
  },
];

export default function ViewTenderEvaluationPage() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true); // expanded by default, matches screenshot 1&2
  const totalItemAmount = MOCK_TENDER_DETAILS.reduce((sum, item) => sum + item.itemAmount, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Tender</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Tender</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Tender</li>
          </ol>
        </nav>
      </div>

      {/* ── Main Card (collapsible) ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header with collapse/expand toggle */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Tender</h3>
          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="flex size-5 items-center justify-center rounded bg-white/20 text-white hover:bg-white/30"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? "−" : "+"}
          </button>
        </div>

        {/* Collapsible content */}
        {isExpanded && (
          <div className="p-5">
            {/* Row 1 */}
            <div className="mb-4 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Tender Reference Number</p>
                <p className="text-sm font-medium text-[#17a2b8]">12345</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tender Type</p>
                <p className="text-sm font-medium text-[#17a2b8]">Open Tender</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tender Category</p>
                <p className="text-sm font-medium text-[#17a2b8]">Printing and Publishing</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tender Name</p>
                <p className="text-sm font-medium text-[#17a2b8]">Trial Tender</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500">Tender Description</p>
              <p className="text-sm font-medium text-[#17a2b8]">Trial</p>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Contract Form</p>
                <p className="text-sm font-medium text-dark dark:text-white"></p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Number of Cover</p>
                <p className="text-sm font-medium text-[#17a2b8]">2</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Source of Funding</p>
                <p className="text-sm font-medium text-[#17a2b8]">Trial</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Number Of Bid Openers</p>
                <p className="text-sm font-medium text-[#17a2b8]">2</p>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Re-bid Submission Allowed</p>
                <p className="text-sm font-medium text-[#17a2b8]">No</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Bids Withdraw Allowed</p>
                <p className="text-sm font-medium text-[#17a2b8]">Yes</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Offline Submission Allowed</p>
                <p className="text-sm font-medium text-[#17a2b8]">No</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Technical Evaluation Required</p>
                <p className="text-sm font-medium text-[#17a2b8]">No</p>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Multi Currency Allowed</p>
                <p className="text-sm font-medium text-[#17a2b8]">Yes</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Mode</p>
                <p className="text-sm font-medium text-[#17a2b8]">NEFT</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Earnest Deposit</p>
                <p className="text-sm font-medium text-[#17a2b8]">₹ 100.0</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Cost of Tender Form</p>
                <p className="text-sm font-medium text-[#17a2b8]">₹ 100.0</p>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs text-gray-500">Last Date of Submission</p>
              <p className="text-sm font-medium text-[#17a2b8]">30-Nov-2022</p>
            </div>

            {/* Critical Dates */}
            <div className="mb-2 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Critical Dates</h4>
            </div>
            <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
              <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-500">Published Date</p>
                  <p className="text-sm font-medium text-[#17a2b8]">17-Nov-2022</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bid Opening Date</p>
                  <p className="text-sm font-medium text-[#17a2b8]">28-Nov-2022</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bid Closing Date</p>
                  <p className="text-sm font-medium text-[#17a2b8]">30-Nov-2022</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Document Download / Sale Start Date</p>
                  <p className="text-sm font-medium text-[#17a2b8]">28-Nov-2022</p>
                </div>
              </div>
              <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-500">Document Download / Sale End Date</p>
                  <p className="text-sm font-medium text-[#17a2b8]">29-Nov-2022</p>
                </div>
                <div></div><div></div><div></div>
              </div>
              <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-500">Clarification Start Date</p>
                  <p className="text-sm font-medium text-[#17a2b8]">28-Nov-2022</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Clarification End Date</p>
                  <p className="text-sm font-medium text-[#17a2b8]">29-Nov-2022</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bid Submission End Date</p>
                  <p className="text-sm font-medium text-[#17a2b8]">27-Nov-2022</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bid Submission Start Date</p>
                  <p className="text-sm font-medium text-[#17a2b8]">28-Nov-2022</p>
                </div>
              </div>
              <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-500">Pre Bid Meeting Date</p>
                  <p className="text-sm font-medium text-dark dark:text-white"></p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fee Payable To</p>
                  <p className="text-sm font-medium text-[#17a2b8]">ABC Company</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tender Fee Exemption Allowed</p>
                  <p className="text-sm font-medium text-[#17a2b8]">No</p>
                </div>
                <div></div>
              </div>
              <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Bid Opening Address</p>
                  <p className="text-sm font-medium text-[#17a2b8]">Trial</p>
                  <p className="text-sm font-medium text-[#17a2b8]">CHENNAI</p>
                  <p className="text-sm font-medium text-[#17a2b8]">TAMIL NADU</p>
                  <p className="text-sm font-medium text-[#17a2b8]">India</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pre Bid Meeting Address</p>
                  <p className="text-sm font-medium text-[#17a2b8]">Trial</p>
                  <p className="text-sm font-medium text-[#17a2b8]">CHENNAI</p>
                  <p className="text-sm font-medium text-[#17a2b8]">TAMIL NADU</p>
                  <p className="text-sm font-medium text-[#17a2b8]">India</p>
                </div>
              </div>
            </div>

            {/* EMD Fee Type */}
            <div className="mb-2 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">EMD Fee Type</h4>
            </div>
            <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
              <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-500">EMD Fee Type</p>
                  <p className="text-sm font-medium text-[#17a2b8]">fixed</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">EMD Exemption Allowed</p>
                  <p className="text-sm font-medium text-[#17a2b8]">No</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">EMD Percentage</p>
                  <p className="text-sm font-medium text-[#17a2b8]">10.0</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">EMD Payable To</p>
                  <p className="text-sm font-medium text-[#17a2b8]">DEF company</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-500">EMD Payable At</p>
                  <p className="text-sm font-medium text-[#17a2b8]">DEF</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Earnest Deposit</p>
                  <p className="text-sm font-medium text-[#17a2b8]">100.00</p>
                </div>
                <div></div><div></div>
              </div>
            </div>

            {/* Tender Cover Information */}
            <div className="mb-2 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Tender Cover Information</h4>
            </div>
            <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
              <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-3">
                <div>
                  <p className="text-xs text-gray-500">Cover No</p>
                  <p className="text-sm font-medium text-[#17a2b8]">2</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Cover Type</p>
                  <p className="text-sm font-medium text-[#17a2b8]">fee</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Document Type</p>
                  <p className="text-sm font-medium text-[#17a2b8]">pdf</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Description</p>
                <p className="text-sm font-medium text-[#17a2b8]">abc</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Tender Details + Form of Contract — always visible ── */}
      <div className="mt-4 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          {/* Tender Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Tender Details</h4>
          </div>
          <div className="mb-6 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Item Code / Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Specifications</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Description</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Item Amount (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Quotation Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TENDER_DETAILS.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.itemCodeName}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.quantity.toFixed(2)}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.specifications}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.description}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.itemAmount.toFixed(2)}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.quotationAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td colSpan={5} className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">Total</td>
                    <td className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">{totalItemAmount.toFixed(1)}</td>
                    <td className="border border-stroke px-3 py-2 dark:border-dark-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Form Of Contract */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Form Of Contract - Supply or Purchase</h4>
          </div>
          <div className="mb-6 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Tender Inviting Authority Name</p>
                <p className="text-sm font-medium text-[#17a2b8]">ABC Company</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">LandLine Number</p>
                <p className="text-sm font-medium text-dark dark:text-white"></p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Mobile Number</p>
                <p className="text-sm font-medium text-dark dark:text-white"></p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tender Inviting Authority Address Line 1</p>
                <p className="text-sm font-medium text-[#17a2b8]">Trial</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Tender Inviting Authority Address Line 2</p>
                <p className="text-sm font-medium text-[#17a2b8]">Trial</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tender Inviting Authority Address Line 3</p>
                <p className="text-sm font-medium text-[#17a2b8]">Trial</p>
              </div>
              <div></div><div></div>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/operational/tender/tender-evaluation/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12,19 5,12 12,5" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}