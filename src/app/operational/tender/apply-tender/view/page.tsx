"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BidPaymentItem {
  id: number;
  feeType: string;
  actualFee: number;
  exemptedFee: number | null;
  feeToBePaid: number;
  paidFee: number;
}

interface TenderDetailItem {
  id: number;
  itemCodeName: string;
  quantity: number;
  specifications: string;
  description: string;
  itemAmount: number;
}

interface UploadedDocument {
  id: number;
  documentName: string;
}

const MOCK_BID_PAYMENT: BidPaymentItem[] = [
  { id: 1, feeType: "TenderFee", actualFee: 100.00, exemptedFee: null, feeToBePaid: 100.00, paidFee: 50.00 },
  { id: 2, feeType: "EMDFee", actualFee: 100.00, exemptedFee: null, feeToBePaid: 100.00, paidFee: 50.00 },
];

const MOCK_TENDER_DETAILS: TenderDetailItem[] = [
  { id: 1, itemCodeName: "PKW1 / Pure Zari Silk Pavadai 50Cmx120mt", quantity: 10, specifications: "trial", description: "trial", itemAmount: 100.00 },
];

const MOCK_DOCUMENTS: UploadedDocument[] = [];

export default function ViewApplyTenderPage() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const totalItemAmount = MOCK_TENDER_DETAILS.reduce((sum, item) => sum + item.itemAmount, 0);

  const SectionIcon = () => (
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
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

      {/* ── Card 1: Collapsible (Tender info + Bid Payment Details) ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
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

        {/* Collapsible Content */}
        {isExpanded && (
          <div className="p-5">
            {/* Tender Info */}
            <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-4">
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
            <div className="mb-6">
              <p className="text-xs text-gray-500">Supplier Name</p>
              <p className="text-sm font-medium text-[#17a2b8]">Trial Tender</p>
            </div>

            {/* Bid Payment Details */}
            <div className="mb-2 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Bid Payment Details</h4>
            </div>
            <div className="border-t border-stroke pt-3 dark:border-dark-3">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="w-12 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Fee Type</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Actual Fee (₹)</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Exempted Fee (₹)</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Fee To Be Paid (₹)</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Paid Fee (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_BID_PAYMENT.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="border border-stroke px-3 py-4 text-left text-sm text-gray-500 dark:border-dark-3">
                          No records found.
                        </td>
                      </tr>
                    ) : (
                      MOCK_BID_PAYMENT.map((item: BidPaymentItem, idx: number) => (
                        <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                          <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                          <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.feeType}</td>
                          <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.actualFee.toFixed(2)}</td>
                          <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">
                            {item.exemptedFee !== null ? item.exemptedFee.toFixed(2) : ""}
                          </td>
                          <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.feeToBePaid.toFixed(2)}</td>
                          <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.paidFee.toFixed(2)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Card 2: Always visible (Tender Details + Uploaded Documents + Back) ── */}
      <div className="mt-4 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">

          {/* Tender Details */}
          <div className="mb-2 flex items-center gap-2">
            <SectionIcon />
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
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TENDER_DETAILS.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="border border-stroke px-3 py-4 text-left text-sm text-gray-500 dark:border-dark-3">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    MOCK_TENDER_DETAILS.map((item: TenderDetailItem, idx: number) => (
                      <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.itemCodeName}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.quantity}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.specifications}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.description}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.itemAmount.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td colSpan={5} className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">Total</td>
                    <td className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">
                      {totalItemAmount.toFixed(1)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="mb-2 flex items-center gap-2">
            <SectionIcon />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Uploaded Documents</h4>
          </div>
          <div className="mb-6 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Document Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_DOCUMENTS.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="border border-stroke px-3 py-4 text-left text-sm text-gray-500 dark:border-dark-3">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    MOCK_DOCUMENTS.map((doc: UploadedDocument, idx: number) => (
                      <tr key={doc.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{doc.documentName}</td>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                          <button className="inline-flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/operational/tender/apply-tender/list")}
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